import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    color: typeof color;
    spacing: typeof spacing;
  }
}

const color = {
  black: "#121212",
  white: "#ffffff",
};

const spacing = {
  xs: 8,
  s: 16,
  m: 32,
  l: 48,
};

export const theme: DefaultTheme = {
  name: "shadow",
  color,
  spacing,
};
