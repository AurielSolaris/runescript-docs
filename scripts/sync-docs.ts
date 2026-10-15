// Copies the RuneScript docs and examples into this site.
//
//   bun run sync                     # reads ../RuneScript
//   RUNESCRIPT_DIR=/path bun run sync
//
// The output (src/content/docs, src/content/translations, src/data/examples.json)
// is committed, so the site builds without the language repo next to it.
import { readdir, readFile, writeFile, mkdir, rm, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const src = resolve(root, process.env.RUNESCRIPT_DIR ?? "../RuneScript");
const repo = "https://github.com/AurielSolaris/runescript";
const outDocs = join(root, "src/content/docs");
const outTranslations = join(root, "src/content/translations");
const outData = join(root, "src/data");

if (!existsSync(join(src, "docs/guide"))) {
  console.error(`sync-docs: no RuneScript checkout at ${src}`);
  process.exit(1);
}

interface Page {
  file: string; // path relative to src/docs
  slug: string;
  section: "Guide" | "Reference" | "Project";
  order: number;
}

const guideFiles = (await readdir(join(src, "docs/guide")))
  .filter((f) => /^\d+-.*\.md$/.test(f))
  .sort();

const pages: Page[] = [
  ...guideFiles.map((f) => ({
    file: `guide/${f}`,
    slug: f.replace(/^\d+-/, "").replace(/\.md$/, ""),
    section: "Guide" as const,
    order: Number.parseInt(f, 10),
  })),
  { file: "LANGUAGE_SPEC.md", slug: "spec", section: "Reference", order: 100 },
  { file: "ROADMAP.md", slug: "roadmap", section: "Project", order: 200 },
];

// Maps a link target as written in the source docs to a site URL.
function rewriteLink(target: string, from: string): string {
  if (/^(https?:|mailto:|#)/.test(target)) return target;
  const [path, hash] = target.split("#");
  const anchor = hash ? `#${hash}` : "";
  const fromDir = from.includes("/") ? from.slice(0, from.lastIndexOf("/") + 1) : "";
  const normalized = new URL(path, `file:///docs/${fromDir}`).pathname.replace(/^\/docs\//, "");
  const page = pages.find((p) => p.file === normalized);
  if (page) return `/docs/${page.slug}${anchor}`;
  if (normalized === "guide/README.md") return `/docs${anchor}`;
  const repoPath = new URL(path, `file:///docs/${fromDir}`).pathname.replace(/^\//, "");
  return `${repo}/blob/main/${repoPath}${anchor}`;
}

const doneBadge =
  '<span class="done-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>Done</span>';

// Search engines show about 155 characters. Cut at a sentence end, else a word boundary.
function clip(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  // "।" (danda) ends a sentence in Bengali.
  const sentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("। "));
  if (sentence > 80) return cut.slice(0, sentence + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + "…";
}

function metaDescription(title: string, summary: string | undefined, prose: string): string {
  const lead = summary ? `${title.replace(/`/g, "")} in RuneScript: ${summary} ` : "";
  return clip(lead + prose);
}

// The guide's README gives each chapter a one-line summary, used in listings.
const guideReadme = await readFile(join(src, "docs/guide/README.md"), "utf8");
const summaries = new Map<string, string>();
for (const m of guideReadme.matchAll(/^\d+\. \[[^\]]+\]\(([\w-]+\.md)\): (.+)$/gm)) {
  const text = m[2].replace(/`/g, "").trim();
  summaries.set(`guide/${m[1]}`, text.charAt(0).toUpperCase() + text.slice(1) + ".");
}

await rm(outDocs, { recursive: true, force: true });
await mkdir(outDocs, { recursive: true });
await mkdir(outData, { recursive: true });

for (const page of pages) {
  let md = await readFile(join(src, "docs", page.file), "utf8");
  md = md.replace(/\r\n/g, "\n");

  const h1 = md.match(/^# (.+)\n/m);
  const titles: Record<string, string> = { spec: "Language specification" };
  const title = (titles[page.slug] ?? h1?.[1] ?? page.slug)
    .replace(/`/g, "")
    .replace(/^\d+\.\s*/, "")
    .replace(/^RuneScript\s+/, "")
    .replace(/^./, (c) => c.toUpperCase());
  if (h1) md = md.replace(h1[0], "");

  // The site renders its own previous/next links.
  md = md.replace(/\n(Next|Previous): \[[^\]]*\]\([^)]*\)\s*$/g, "\n");
  md = md.replace(/\]\(([^)\s]+)\)/g, (_, t) => `](${rewriteLink(t, page.file)})`);
  // The site uses SVG icons, not emoji: ✅ becomes a "Done" check badge.
  md = md.replace(/\s*✅️?/g, ` ${doneBadge}`);

  const description = md
    .replace(/```[\s\S]*?```/g, "")
    .split("\n\n")
    .map((b) => b.trim())
    .find((b) => /^[A-Z]/.test(b) && /[.!?)]$/.test(b))
    ?.replace(/\s+/g, " ")
    .replace(/\*\*|`/g, "")
    ;

  const fm = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(metaDescription(title, summaries.get(page.file), description ?? ""))}`,
    `summary: ${JSON.stringify(summaries.get(page.file) ?? "")}`,
    `section: ${page.section}`,
    `order: ${page.order}`,
    `source: ${JSON.stringify(`docs/${page.file}`)}`,
    "---",
    "",
  ].join("\n");
  await writeFile(join(outDocs, `${page.slug}.md`), fm + md.trimStart());
}

// Translations: localization/<lang>/docs/guide/ becomes /<lang>/docs. Only the
// guide is translated; links to the specification, the roadmap, and other
// untranslated files point at the English pages.
const localizationDir = join(src, "localization");
const langs = existsSync(localizationDir)
  ? (await readdir(localizationDir, { withFileTypes: true }))
      .filter((d) => d.isDirectory() && existsSync(join(localizationDir, d.name, "docs/guide")))
      .map((d) => d.name)
      .sort()
  : [];

function rewriteTranslatedLink(target: string, lang: string): string {
  if (/^(https?:|mailto:|#)/.test(target)) return target;
  const [path, hash] = target.split("#");
  const anchor = hash ? `#${hash}` : "";
  const resolved = new URL(path, `file:///localization/${lang}/docs/guide/`).pathname;
  const guideDir = `/localization/${lang}/docs/guide/`;
  if (resolved.startsWith(guideDir)) {
    const name = resolved.slice(guideDir.length);
    if (name === "README.md") return `/${lang}/docs${anchor}`;
    const page = pages.find((p) => p.file === `guide/${name}`);
    if (page) return `/${lang}/docs/${page.slug}${anchor}`;
  }
  if (resolved.startsWith("/docs/")) return rewriteLink(resolved.slice("/docs/".length) + anchor, "");
  return `${repo}/blob/main${resolved}${anchor}`;
}

// Sentence-final punctuation for the summaries, as the English ones get ".".
const fullStop: Record<string, string> = { bn: "।" };

await rm(outTranslations, { recursive: true, force: true });
let translatedPages = 0;
for (const lang of langs) {
  const guideDir = join(localizationDir, lang, "docs/guide");
  await mkdir(join(outTranslations, lang), { recursive: true });

  const index = existsSync(join(guideDir, "README.md")) ? await readFile(join(guideDir, "README.md"), "utf8") : "";
  const localSummaries = new Map<string, string>();
  for (const m of index.replace(/\r\n/g, "\n").matchAll(/^\d+\. \[[^\]]+\]\(([\w-]+\.md)\): (.+)$/gm)) {
    localSummaries.set(m[1], m[2].replace(/`/g, "").trim() + (fullStop[lang] ?? "."));
  }

  const files = [
    { file: "README.md", slug: "index", order: 0 },
    ...pages.filter((p) => p.section === "Guide").map((p) => ({ file: p.file.slice("guide/".length), slug: p.slug, order: p.order })),
  ];
  for (const f of files) {
    const path = join(guideDir, f.file);
    if (!existsSync(path)) continue;
    let md = (await readFile(path, "utf8")).replace(/\r\n/g, "\n");
    md = md.replace(/^<!-- source: [^\n]*-->\n/, "");
    // GitHub needs <div dir="rtl"> around right-to-left prose; the site sets dir on <html>.
    md = md.replace(/^<div dir="(rtl|ltr)">\n|^<\/div>\n?/gm, "");
    const h1 = md.match(/^# (.+)\n/m);
    const title = (h1?.[1] ?? f.slug).replace(/`/g, "").replace(/^[\d০-৯]+\.\s*/, "");
    if (h1) md = md.replace(h1[0], "");
    // The site renders its own previous/next links: drop the closing "Next: [...](...)" line.
    md = md.replace(/\n[^\n[]{1,30}:[^\n]*\]\((?:\d+-[\w-]+|README)\.md\)[^\n]*\s*$/, "\n");
    md = md.replace(/\]\(([^)\s]+)\)/g, (_, t) => `](${rewriteTranslatedLink(t, lang)})`);

    const prose = md
      .replace(/```[\s\S]*?```/g, "")
      .split("\n\n")
      .map((b) => b.trim())
      .find((b) => b && !/^[>#|<\-*\d]/.test(b) && /[.!?)।:]$/.test(b))
      ?.replace(/\s+/g, " ")
      .replace(/\*\*|`/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
    const summary = localSummaries.get(f.file) ?? "";

    const fm = [
      "---",
      `title: ${JSON.stringify(title)}`,
      `description: ${JSON.stringify(clip([summary, prose].filter(Boolean).join(" ")))}`,
      `summary: ${JSON.stringify(summary)}`,
      `order: ${f.order}`,
      `page: ${JSON.stringify(f.slug === "index" ? "" : f.slug)}`,
      `source: ${JSON.stringify(`localization/${lang}/docs/guide/${f.file}`)}`,
      "---",
      "",
    ].join("\n");
    await writeFile(join(outTranslations, lang, `${f.slug}.md`), fm + md.trimStart());
    translatedPages++;
  }
}

// Examples: code, description from examples/README.md, and expected output.
const readme = await readFile(join(src, "examples/README.md"), "utf8");
const describe = new Map<string, string>();
for (const m of readme.matchAll(/^\| \[`([\w.]+)`\]\([^)]*\) \| (.+) \|$/gm)) {
  describe.set(m[1], m[2].trim());
}

async function diagnostics(file: string): Promise<string | null> {
  try {
    const proc = Bun.spawn(["go", "run", "./cmd/runescript", "check", `examples/${file}`], {
      cwd: src,
      stdout: "pipe",
      stderr: "pipe",
    });
    const [out, err] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text()]);
    await proc.exited;
    return (out + err).replace(/\r\n/g, "\n").replace(/\nexit status \d+\n?$/, "").trimEnd() || null;
  } catch {
    return null;
  }
}

const exampleFiles = (await readdir(join(src, "examples"))).filter((f) => f.endsWith(".rsc")).sort();
const examples = [];
for (const file of exampleFiles) {
  const name = file.replace(/\.rsc$/, "");
  const code = (await readFile(join(src, "examples", file), "utf8")).replace(/\r\n/g, "\n").trimEnd();
  const outPath = join(src, "tests/testdata/examples", `${name}.out`);
  const rejected = name.endsWith("_error");
  const output = rejected
    ? await diagnostics(file)
    : existsSync(outPath)
      ? (await readFile(outPath, "utf8")).replace(/\r\n/g, "\n").trimEnd()
      : null;
  examples.push({ name, file, description: describe.get(file) ?? "", rejected, code, output });
}
await writeFile(join(outData, "examples.json"), JSON.stringify(examples, null, 2) + "\n");

// Logo
await mkdir(join(root, "public"), { recursive: true });
await copyFile(join(src, "assets/runescript.svg"), join(root, "public/runescript.svg"));
await copyFile(join(src, "assets/runescript-icon.svg"), join(root, "public/favicon.svg"));

console.log(`sync-docs: ${pages.length} pages, ${translatedPages} translated pages (${langs.join(", ")}), ${examples.length} examples from ${src}`);
