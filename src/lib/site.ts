export const site = {
  name: "RuneScript",
  tagline: "A statically typed language with ActionScript roots",
  description:
    "RuneScript is a strict, statically typed, general-purpose programming language inspired by ActionScript and implemented in Go. Located diagnostics, no implicit any, no silent integer overflow, checked conversions, ActionScript-style errors, and a JavaScript target that keeps the same rules.",
  // From astro.config.mjs: SITE_URL, else the Vercel production domain.
  url: import.meta.env.SITE.replace(/\/$/, ""),
  repo: "https://github.com/AurielSolaris/runescript",
  version: "0.3",
  locale: "en",
  themeColor: { light: "#FFFFFF", dark: "#1F1F21" },
};

export const nav = [
  { href: "/docs", label: "Docs" },
  { href: "/examples", label: "Examples" },
  { href: "/docs/spec", label: "Specification" },
  { href: "/docs/roadmap", label: "Roadmap" },
];

export const sectionOrder = ["Guide", "Reference", "Project"] as const;
