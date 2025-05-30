import { css } from "hono/css";

export const globalStyle = css`
  :root {
    // Place for variables
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  html {
    font-size: 62.5%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  body {
    box-sizing: border-box;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
`;