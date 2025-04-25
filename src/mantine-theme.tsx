import {
  colorsTuple,
  createTheme,
  DefaultMantineColor,
  MantineColorsTuple,
  virtualColor,
} from "@mantine/core";

const theme = createTheme({
  breakpoints: {
    xs: "576px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  fontFamily: "Poppins, Helvetica, Arial, sans-serif",
  primaryColor: "primary",
  primaryShade: 5,
  colors: {
    /* Blue */
    primary: [
      "#e6f4ff",
      "#d1e3ff",
      "#a3c4f8",
      "#72a3f1",
      "#4987eb",
      "#2e76e8",
      "#1d6de8",
      "#0b5ccf",
      "#0052ba",
      "#0046a5",
    ],
    /* Steel Blue */
    secondary: [
      "#ebf5ff",
      "#dde6f4",
      "#bbcae0",
      "#97adcd",
      "#7894bc",
      "#6584b2",
      "#597daf",
      "#496b9a",
      "#3e5f8b",
      "#2f527d",
    ],
    /* Emerald Green */
    success: [
      "#e9fcee",
      "#d8f5e0",
      "#b2e8c1",
      "#89db9f",
      "#67d083",
      "#51ca70",
      "#44c666",
      "#34af55",
      "#2a9c4a",
      "#19873c",
    ],
    /* Light Beige */
    "accent-bg": [
      "#f9f6f0",
      "#efebe3",
      "#dfd5c0",
      "#d0bd9a",
      "#c2a97a",
      "#ba9d65",
      "#b69659",
      "#a08249",
      "#8f733f",
      "#7c6332",
    ],
    /* Soft Red */
    danger: [
      "#ffe7e8",
      "#ffcece",
      "#ff9b9b",
      "#ff6464",
      "#fe3736",
      "#fe1b19",
      "#ff0909",
      "#e40000",
      "#cb0000",
      "#b20000",
    ],
    vibrantYellow: [
      "#fffce1",
      "#fff8cb",
      "#ffef9a",
      "#ffe764",
      "#ffdf38",
      "#ffdb1c",
      "#ffd809",
      "#e3bf00",
      "#caaa00",
      "#ae9200",
    ],
    desaturatedYellow: [
      "#fff8df",
      "#fff0ca",
      "#ffe099",
      "#ffce63",
      "#ffbf36",
      "#ffb618",
      "#ffb103",
      "#e49b00",
      "#cb8900",
      "#b07600",
    ],
    accent: virtualColor({
      name: "accent",
      dark: "desaturatedYellow",
      light: "vibrantYellow",
    }),
    lightGray: colorsTuple("#f5f5f5"),
    darkGray: colorsTuple("#2a2a2a"),
    light: virtualColor({
      name: "light",
      dark: "darkGray",
      light: "lightGray",
    }),
  },
});

type ExtendedCustomColors =
  | "primary"
  | "secondary"
  | "success"
  | "accent"
  | "accent-bg"
  | "danger"
  | "light"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

export default theme;
