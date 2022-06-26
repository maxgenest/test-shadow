import { createGlobalStyle } from "styled-components";

// eslint-disable-next-line import/no-default-export
export default createGlobalStyle`
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
