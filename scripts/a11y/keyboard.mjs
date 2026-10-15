// Keyboard and interactive-state checks that axe cannot do on a static page.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:4321";
const axeSource = readFileSync(new URL("../../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");
const browser = await chromium.launch(process.env.A11Y_CHANNEL ? { channel: process.env.A11Y_CHANNEL } : {});
let failures = 0;
const check = (ok, what) => {
  console.log(`${ok ? "ok  " : "FAIL"} ${what}`);
  if (!ok) failures++;
};
const active = (page) => page.evaluate(() => {
  const el = document.activeElement;
  return el ? (el.getAttribute("aria-label") || el.textContent || el.tagName).trim().slice(0, 40) : "";
});
const axe = async (page, what) => {
  await page.addScriptTag({ content: axeSource });
  const r = await page.evaluate(() => axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"] } }));
  check(r.violations.length === 0, `axe: ${what}` + (r.violations.length ? ` — ${r.violations.map((v) => v.id).join(", ")}` : ""));
};

// Desktop
{
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(base + "/docs/errors", { waitUntil: "networkidle" });

  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => {
    const el = document.activeElement;
    const r = el.getBoundingClientRect();
    return { text: el.textContent.trim(), visible: r.width > 0 && r.height > 0 && r.top >= 0 };
  });
  check(skip.text === "Skip to content" && skip.visible, "first Tab reaches a visible skip link");
  await page.keyboard.press("Enter");
  check(await page.evaluate(() => document.activeElement?.id === "main"), "skip link moves focus to main");

  // Focus is visible on a nav link.
  await page.focus(".topnav__links a");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  const ring = await page.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2; });
  check(ring, `keyboard focus shows a 2px outline (${outline})`);

  // Theme menu
  await page.focus('.theme-menu button[aria-haspopup="menu"]');
  await page.keyboard.press("Enter");
  await page.waitForTimeout(100);
  check(await page.evaluate(() => document.activeElement?.getAttribute("role") === "menuitemradio"), "Enter opens the theme menu and focuses an item");
  await axe(page, "theme menu open");
  const first = await active(page);
  await page.keyboard.press("ArrowDown");
  check((await active(page)) !== first, "ArrowDown moves within the menu");
  await page.keyboard.press("Escape");
  check(await page.evaluate(() => document.activeElement?.getAttribute("aria-haspopup") === "menu"), "Escape closes the menu and returns focus to its button");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(100);
  await page.keyboard.press("Tab");
  await page.waitForTimeout(100);
  check(await page.evaluate(() => getComputedStyle(document.querySelector(".theme-menu__panel")).display === "none"), "Tab out of the menu closes it");

  // Heading anchors are reachable and named.
  check(await page.evaluate(() => [...document.querySelectorAll(".heading-anchor")].every((a) => a.getAttribute("aria-label")?.startsWith("Link to section"))), "heading anchors have names");
}

// Home page tabs
{
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.focus('[role="tab"][aria-selected="true"]');
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(100);
  const state = await page.evaluate(() => {
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    const sel = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    const focus = tabs.indexOf(document.activeElement);
    const panel = document.getElementById(tabs[sel].getAttribute("aria-controls"));
    return { sel, focus, panelVisible: panel && getComputedStyle(panel).display !== "none", tabindex: tabs.map((t) => t.tabIndex) };
  });
  check(state.sel === 1 && state.focus === 1 && state.panelVisible, "ArrowRight selects and focuses the next tab and shows its panel");
  check(state.tabindex.filter((t) => t === 0).length === 1, "only the selected tab is in the tab order");
}

// Phone
{
  const page = await (await browser.newContext({ viewport: { width: 375, height: 800 }, hasTouch: true })).newPage();
  await page.goto(base + "/docs/getting-started", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const regions = await page.evaluate(() => [...document.querySelectorAll("[data-scroll-region]")].map((r) => ({ over: r.scrollWidth > r.clientWidth + 1, tab: r.tabIndex })));
  check(regions.length > 0 && regions.every((r) => (r.over ? r.tab === 0 : r.tab === -1)), `scrollable tables are focusable exactly when they overflow (${regions.filter((r) => r.over).length} of ${regions.length})`);

  await page.focus('button[aria-controls="docs-sidebar"]');
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  check(await page.evaluate(() => document.getElementById("docs-sidebar").contains(document.activeElement)), "opening the docs menu moves focus into it");
  await axe(page, "docs menu open (phone)");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  check(await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "docs-sidebar"), "Escape closes the docs menu and returns focus to its button");
  check(await page.evaluate(() => getComputedStyle(document.getElementById("docs-sidebar")).visibility === "hidden"), "the closed docs menu is hidden from keyboard and screen readers");

  await page.focus('button[aria-controls="mobile-nav"]');
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  check(await page.evaluate(() => document.getElementById("mobile-nav").contains(document.activeElement)), "opening the site menu moves focus into it");
  await axe(page, "site menu open (phone)");
}

// Forced colours: the task-list status icons stay visible.
{
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 }, forcedColors: "active" })).newPage();
  await page.goto(base + "/docs/roadmap", { waitUntil: "networkidle" });
  const bg = await page.evaluate(() => getComputedStyle(document.querySelector(".prose input[type=checkbox]")).backgroundColor);
  check(bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent", `forced colours: task-list icons have a colour (${bg})`);
}

await browser.close();
console.log(failures ? `\n${failures} failed` : "\nall keyboard checks passed");
process.exit(failures ? 1 : 0);
