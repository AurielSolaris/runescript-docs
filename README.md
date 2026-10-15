# RuneScript website

[runescript-alpha.vercel.app](https://runescript-alpha.vercel.app)

Landing page and docs for [RuneScript](https://github.com/AurielSolaris/runescript).
Astro + Alpine.js + SCSS, with the site's own design tokens (`src/styles/_tokens.scss`):
colours from GitHub's open-source Primer themes (GitHub Light, GitHub Dark Dimmed),
Inter and JetBrains Mono fonts, and Lucide icon paths. See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

```sh
bun install
bun run dev                  # http://localhost:4321
bun run sync                 # pull docs/examples from ../RuneScript (or RUNESCRIPT_DIR=...)
scripts/render-images.sh     # re-render icons and og.png with headless Edge
bun run build
vercel deploy --prod
```

The synced docs (`src/content/docs`) and examples (`src/data/examples.json`) are committed,
so builds don't need the language repo. `SITE_URL` overrides the canonical origin; on
Vercel it defaults to the project's production domain.

## Accessibility

The site targets WCAG 2.2 AA. After `bun run build` and `bun run preview`:

```sh
bunx playwright install chromium   # once; or A11Y_CHANNEL=msedge / chrome to use an installed browser
bun run a11y
```

`scripts/a11y/audit.mjs` runs axe-core (WCAG 2.0, 2.1, and 2.2 A/AA, plus best
practices) on every page in light and dark mode at desktop and phone widths, and
checks reflow at 320px. `scripts/a11y/keyboard.mjs` checks what axe can't: the
skip link, focus visibility, the theme menu, the tabs, the mobile menus, scrollable
tables, and forced-colours mode.

## License

Code is [MIT](LICENSE); the site's own text is [CC BY 4.0](LICENSE-CONTENT.md).
Documentation synced from the language repository keeps the language's MIT license.
