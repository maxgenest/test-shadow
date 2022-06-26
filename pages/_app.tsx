import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import GlobalCSS from "../global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalCSS />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
