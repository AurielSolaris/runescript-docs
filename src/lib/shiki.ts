import { createCssVariablesTheme } from "shiki/core";

// Token colours come from CSS variables, which _components.scss maps onto ADS
// accent tokens, so code follows the light/dark theme without a second pass.
export const adsTheme = createCssVariablesTheme({
  name: "ads",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});
