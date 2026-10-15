// Accessibility audit of the built site: axe-core (WCAG 2.0/2.1/2.2 A and
// AA, plus best practices) on every page, in light and dark, at desktop and
// phone widths, plus reflow at 320 CSS px (WCAG 1.4.10).
import { chromium } from "playwright";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const base = process.argv[2] ?? "http://localhost:4321";
const dist = process.argv[3] ?? fileURLToPath(new URL("../../dist", import.meta.url));
const axeSource = readFileSync(new URL("../../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");

const pages = ["/", "/examples", "/docs", "/404"];
for (const f of readdirSync(join(dist, "docs"))) if (f.endsWith(".html")) pages.push("/docs/" + f.replace(/\.html$/, ""));
// Translations: /bn, /heb, their docs index, and each translated chapter.
for (const lang of ["bn", "heb"]) {
  if (!existsSync(join(dist, lang, "docs"))) continue;
  pages.push(`/${lang}`, `/${lang}/docs`);
  for (const f of readdirSync(join(dist, lang, "docs"))) if (f.endsWith(".html")) pages.push(`/${lang}/docs/` + f.replace(/\.html$/, ""));
}

const browser = await chromium.launch(process.env.A11Y_CHANNEL ? { channel: process.env.A11Y_CHANNEL } : {});
const found = new Map(); // rule -> {impact, help, nodes: Set}
let overflow = [];

for (const scheme of ["light", "dark"]) {
  for (const vp of [{ width: 1280, height: 900 }, { width: 375, height: 800 }]) {
    const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    for (const p of pages) {
      await page.goto(base + p, { waitUntil: "networkidle" });
      await page.addScriptTag({ content: axeSource });
      const res = await page.evaluate(async () =>
        // eslint-disable-next-line no-undef
        axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }),
      );
      for (const v of res.violations) {
        const e = found.get(v.id) ?? { impact: v.impact, help: v.help, nodes: new Map() };
        for (const n of v.nodes) {
          const key = n.target.join(" ");
          if (!e.nodes.has(key)) e.nodes.set(key, `${p} [${scheme} ${vp.width}] ${(n.failureSummary ?? "").split("\n").slice(1, 2).join(" ").trim()}`);
        }
        found.set(v.id, e);
      }
    }
    await ctx.close();
  }
}

// Reflow: no horizontal scrolling at 320 CSS px.
{
  const ctx = await browser.newContext({ viewport: { width: 320, height: 640 } });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    const w = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    if (w[0] > w[1]) overflow.push(`${p}: scrollWidth ${w[0]} > ${w[1]}`);
  }
  await ctx.close();
}
await browser.close();

console.log(`pages: ${pages.length} × light/dark × 1280/375`);
if (found.size === 0) console.log("axe: no violations");
for (const [id, e] of found) {
  console.log(`\n[${e.impact}] ${id}: ${e.help} (${e.nodes.size} elements)`);
  let i = 0;
  for (const [target, where] of e.nodes) {
    if (i++ >= 8) { console.log("   …"); break; }
    console.log(`   ${target}  — ${where}`);
  }
}
console.log(overflow.length ? `\nreflow at 320px:\n  ${overflow.join("\n  ")}` : "\nreflow at 320px: ok");
