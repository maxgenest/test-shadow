import { DEVICE_WIDTH } from "libs/utils/constants";
import { DefaultTheme, css } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    color: typeof color;
    spacing: typeof spacing;
    typo: typeof typo;
  }
}

const color = {
  black: "#121212",
  white: "#ffffff",
};

const spacing = {
  xs: "8px",
  s: "16px",
  m: "32px",
  l: "48px",
};

const typo = {
  m: css`
    font-size: 12px;
    @media screen and (min-width: ${DEVICE_WIDTH.MOBILE}px) {
      font-size: 16px;
    }
  `,
  l: css`
    font-size: 24px;
    @media screen and (min-width: ${DEVICE_WIDTH.MOBILE}px) {
      font-size: 32px;
    }
  `,
  xl: css`
    font-size: 36px;
    @media screen and (min-width: ${DEVICE_WIDTH.MOBILE}px) {
      font-size: 48px;
    }
  `,
  xxl: css`
    font-size: 48px;
    @media screen and (min-width: ${DEVICE_WIDTH.MOBILE}px) {
      font-size: 64px;
    }
  `,
};

export const theme: DefaultTheme = {
  name: "shadow",
  color,
  spacing,
  typo,
};
