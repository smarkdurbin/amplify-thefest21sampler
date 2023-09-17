import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Inter } from "next/font/google";
import { Oswald } from "next/font/google";

// Define typefaces
const inter = Inter({ display: "block", subsets: ["latin"] });
const oswald = Oswald({ display: "block", subsets: ["latin"] });

// Colors
const colors = {
  white: {
    50: "#CCC",
    100: "#DDD",
    200: "#DDD",
    300: "#DDD",
    400: "#EEE",
    500: "#EEE",
    600: "#EEE",
    700: "#FFF",
    800: "#FFF",
    900: "#FFF",
  },
};

// Config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Fonts
const fonts = {
  "Source Sans": inter.style.fontFamily,
  Oswald: oswald.style.fontFamily,
  body: inter.style.fontFamily,
  heading: inter.style.fontFamily,
};

// Radii
const radii = {
  none: "0",
  sm: "0.25rem",
  base: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  "3xl": "3rem",
  full: "9999px",
};

// Styles
export const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "gray.900")(props),
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflowY: "hidden",
      width: "100%",
    },
    html: {
      fontSize: "16px",
      height: "100%",
      overflowY: "hidden",
      width: "100%",
    },
  }),
};

// Theme
const theme = extendTheme({
  colors,
  config,
  fonts,
  radii,
  styles,
});

export default theme;
