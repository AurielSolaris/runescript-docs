// Accessibility fixes for rendered Markdown (WCAG 2.2 AA), as a Sätteri
// hast plugin (Astro's Markdown processor):
//
// - Task-list checkboxes (`- [x] item`) get an accessible name, "Done" or
//   "Not done" (1.3.1, 4.1.2). They stay disabled: they show status only.
// - Tables are wrapped in a labelled region that scrolls sideways on narrow
//   screens, instead of making the table itself `display: block`, which
//   makes some screen readers drop the table semantics (1.3.1). The region
//   becomes keyboard-focusable while it overflows (2.1.1; see alpine.ts).
import { defineHastPlugin } from "satteri";

let heading = "";
// Labels used so far in the document; a repeated one gets a number, so
// every region has a unique name.
let labels = new Map<string, number>();

export const a11yPlugin = defineHastPlugin({
  name: "runescript-a11y",
  before() {
    heading = "";
    labels = new Map();
  },
  element: {
    // One visitor, so headings, checkboxes, and tables are seen in document
    // order and each table is labelled by the heading before it.
    filter: ["h1", "h2", "h3", "h4", "h5", "h6", "input", "table"],
    visit(node, ctx) {
      if (node.tagName === "input") {
        if (node.properties?.type === "checkbox") ctx.setProperty(node, "ariaLabel", node.properties.checked ? "Done" : "Not done");
        return;
      }
      if (node.tagName === "table") {
        let label = heading ? `Table: ${heading}` : "Table";
        const n = (labels.get(label) ?? 0) + 1;
        labels.set(label, n);
        if (n > 1) label += ` (${n})`;
        ctx.wrapNode(node, {
          type: "element",
          tagName: "div",
          properties: {
            className: ["table-scroll"],
            role: "region",
            ariaLabel: label,
            dataScrollRegion: "",
          },
          children: [],
        });
        return;
      }
      heading = ctx.textContent(node).replace(/#$/, "").trim();
    },
  },
});
