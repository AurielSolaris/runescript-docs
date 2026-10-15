import { createCssVariablesTheme } from "shiki/core";

// Token colours come from CSS variables, which _components.scss maps onto the
// site's syntax colours, so code follows the light/dark theme without a second pass.
export const codeTheme = createCssVariablesTheme({
  name: "runescript-site",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});
