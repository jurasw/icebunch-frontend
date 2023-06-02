import { extendTheme } from "@chakra-ui/react";
export const theme = extendTheme({
  colors: {
    primary: "#0079FF",
    "primary.hover": "#2395ff",
    background: "#f5f7fe",
    transparent: 'rgba(255,255,255,0)',
  },
  components: {
    Button: {
      variants: {
        primaryButton: {
          size: "lg",
          bg: "primary",
          color: "white",
          _hover: {
            bg: "primary.hover",
          },
        },
        primaryOutlineButton: {
          size: "lg",
          bg: "transparent",
          borderWidth: "2px",
          borderColor: "primary",
          color: "primary",
          _hover: {
            bg: "primary",
            color: "white",
          },
        },
      },
    },
  },
});
