import type { Alpine } from "alpinejs";

type Mode = "light" | "dark" | "system";
const THEME_KEY = "runescript:theme";

function readMode(): Mode {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function applyMode(mode: Mode) {
  const root = document.documentElement;
  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);
  try {
    if (mode === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, mode);
  } catch {}
  // Safari tints its toolbar from theme-color; keep it in step with a forced theme.
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    const scheme = mode === "system" ? meta.dataset.scheme : mode;
    meta.content = (scheme === "dark" ? meta.dataset.dark : meta.dataset.light) ?? meta.content;
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

const svg = (body: string) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const copyIcon = svg('<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>');
const checkIcon = svg('<path d="M20 6 9 17l-5-5"/>');

function makeCopyButton(getText: () => string): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn--secondary btn--compact code-block__copy";
  btn.setAttribute("aria-label", "Copy code");
  btn.innerHTML = copyIcon;
  btn.addEventListener("click", async () => {
    if (!(await copyText(getText()))) return;
    btn.innerHTML = checkIcon;
    btn.dataset.copied = "";
    btn.setAttribute("aria-label", "Copied");
    setTimeout(() => {
      btn.innerHTML = copyIcon;
      delete btn.dataset.copied;
      btn.setAttribute("aria-label", "Copy code");
    }, 1500);
  });
  return btn;
}

// Scroll containers marked data-scroll-region are focusable while their
// content overflows, so keyboard users can scroll them (WCAG 2.1.1), and
// are not extra tab stops when it fits.
function scrollRegions() {
  const regions = document.querySelectorAll<HTMLElement>("[data-scroll-region]");
  if (!regions.length) return;
  const update = (el: HTMLElement) => {
    if (el.scrollWidth > el.clientWidth + 1) el.tabIndex = 0;
    else el.removeAttribute("tabindex");
  };
  const all = () => regions.forEach(update);
  // Watch the content too: a web font that loads later widens the table
  // without resizing the region.
  const observer = new ResizeObserver(all);
  regions.forEach((el) => {
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
  });
  all();
  document.fonts?.ready.then(all);
  addEventListener("load", all);
}

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]';

export default (Alpine: Alpine) => {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scrollRegions);
  else scrollRegions();

  Alpine.store("theme", {
    mode: readMode(),
    set(mode: Mode) {
      this.mode = mode;
      applyMode(mode);
    },
  });

  // Popup menu: closes on Escape, outside click, or picking an item; returns focus to the trigger.
  Alpine.data("menu", () => ({
    open: false,
    toggle() {
      if (this.open) this.close();
      else this.show();
    },
    show() {
      this.open = true;
      this.$nextTick(() => {
        const panel = this.$refs.panel as HTMLElement | undefined;
        (panel?.querySelector<HTMLElement>("[aria-checked='true']") ?? panel?.querySelector<HTMLElement>("button"))?.focus();
      });
    },
    close(focusTrigger = true) {
      if (!this.open) return;
      this.open = false;
      if (focusTrigger) (this.$refs.trigger as HTMLElement | undefined)?.focus();
    },
    move(delta: number) {
      const panel = this.$refs.panel as HTMLElement | undefined;
      const items = [...(panel?.querySelectorAll<HTMLElement>("[role^='menuitem']") ?? [])];
      const i = items.indexOf(document.activeElement as HTMLElement);
      items[(i + delta + items.length) % items.length]?.focus();
    },
  }));

  // Mobile docs drawer and mobile nav. Opening moves focus into the panel
  // the button controls (aria-controls); closing returns it to the button
  // (WCAG 2.4.3).
  Alpine.data("drawer", () => ({
    open: false,
    trigger: null as HTMLElement | null,
    toggle() {
      if (this.open) {
        this.close();
        return;
      }
      this.trigger = document.activeElement as HTMLElement | null;
      this.open = true;
      document.documentElement.classList.add("is-locked");
      const panel = document.getElementById(this.trigger?.getAttribute("aria-controls") ?? "");
      // After the panel becomes visible (its visibility transition).
      this.$nextTick(() => requestAnimationFrame(() => panel?.querySelector<HTMLElement>(focusable)?.focus()));
    },
    close() {
      if (!this.open) return;
      this.open = false;
      document.documentElement.classList.remove("is-locked");
      const panel = document.getElementById(this.trigger?.getAttribute("aria-controls") ?? "");
      if (this.trigger && (!document.activeElement || document.activeElement === document.body || panel?.contains(document.activeElement))) {
        this.trigger.focus();
      }
    },
  }));

  // Sidebar filter.
  Alpine.data("docsNav", () => ({
    query: "",
    matches(label: string) {
      return label.toLowerCase().includes(this.query.trim().toLowerCase());
    },
  }));

  // Tabs with arrow-key navigation (WAI-ARIA tabs pattern, automatic activation).
  Alpine.data("tabs", (initial = 0) => ({
    active: initial as number,
    key(e: KeyboardEvent) {
      const tablist = this.$refs.tablist as HTMLElement | undefined;
      const tabs = [...(tablist?.querySelectorAll<HTMLElement>("[role='tab']") ?? [])];
      let i = this.active;
      if (e.key === "ArrowRight") i = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") i = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") i = 0;
      else if (e.key === "End") i = tabs.length - 1;
      else return;
      e.preventDefault();
      this.active = i;
      tabs[i]?.focus();
    },
  }));

  // Copy button for a block whose text is in x-ref="code". Prompt markers aren't copied.
  Alpine.data("copy", () => ({
    copied: false,
    async run() {
      const el = this.$refs.code as HTMLElement | undefined;
      if (el && (await copyText(el.innerText.replace(/^\$ /gm, "")))) {
        this.copied = true;
        setTimeout(() => (this.copied = false), 1500);
      }
    },
  }));

  // Markdown enhancements: copy buttons on code and anchor links on headings.
  Alpine.data("prose", () => ({
    init() {
      const root = this.$el as HTMLElement;
      for (const pre of root.querySelectorAll<HTMLPreElement>("pre.astro-code")) {
        const wrap = document.createElement("div");
        wrap.className = "code-block";
        pre.replaceWith(wrap);
        wrap.append(pre, makeCopyButton(() => pre.innerText));
      }
      for (const h of root.querySelectorAll<HTMLElement>("h2[id], h3[id]")) {
        const a = document.createElement("a");
        a.className = "heading-anchor";
        a.href = `#${h.id}`;
        a.textContent = "#";
        a.setAttribute("aria-label", `Link to section: ${h.textContent ?? ""}`);
        h.append(a);
      }
    },
  }));

  // On this page: highlights the last heading that has scrolled past the top.
  Alpine.data("toc", () => ({
    current: "",
    init() {
      const links = [...(this.$el as HTMLElement).querySelectorAll<HTMLAnchorElement>("a[href^='#']")];
      const targets = links
        .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
        .filter((el): el is HTMLElement => !!el);
      if (!targets.length) return;
      const update = () => {
        const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 80;
        let id = targets[0].id;
        for (const t of targets) if (t.getBoundingClientRect().top - offset <= 1) id = t.id;
        this.current = id;
      };
      update();
      addEventListener("scroll", update, { passive: true });
    },
  }));
};
