import { createGlobalStyle } from "styled-components";

// eslint-disable-next-line import/no-default-export
export default createGlobalStyle`
  html {
    background: ${({ theme }) => theme.color.black};
    color: ${({ theme }) => theme.color.white};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
    margin-bottom: 0;
    padding-left: 0;
  }
`;
