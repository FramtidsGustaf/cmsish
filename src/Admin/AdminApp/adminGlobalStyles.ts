import { css } from "hono/css";
import { theme } from "./theme";

export const adminGlobalStyles = css`
  :root {
    --sidebar-width: 240px;
    --header-height: 60px;

    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    --white: ${theme.colors.white};
    --text-color: ${theme.colors.dark};
    --dark-bg: ${theme.colors.darkLight};
    --primary-color: ${theme.colors.primaryColor};
    --primary-color-light: ${theme.colors.primaryColorLight};
    --content-background-color: ${theme.colors.contentBackgroundColor};

    --mobile-max-width: 767px;
    --desktop-min-width: 1024px;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var(--text-color);
  }

  html {
    font-family: sans-serif
  }

  body {
    box-sizing: border-box;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
`;