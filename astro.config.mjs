// @ts-check
import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";
import { runescript } from "./src/lib/runescript.grammar.ts";
import { codeTheme } from "./src/lib/shiki.ts";
import { satteri } from "@astrojs/markdown-satteri";
import { a11yPlugin } from "./src/lib/rehype-a11y.ts";

// SITE_URL wins; on Vercel, fall back to the project's production domain.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:4321");

export default defineConfig({
  site,
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [alpinejs({ entrypoint: "/src/lib/alpine" }), sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [a11yPlugin] }),
    shikiConfig: {
      theme: codeTheme,
      langs: [runescript],
      langAlias: { as3: "actionscript-3", ebnf: "text" },
    },
  },
});
