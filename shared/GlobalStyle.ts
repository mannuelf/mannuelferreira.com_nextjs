import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: '#FFF',
  heading: '',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#363537',
}

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
}

export const theme = {
  color: {
    black: "#000000",
    smokeyBlack: "#111111",
    eerieBlack: "#222222",
    jet: "#333333",
    blackOlive: "#444444",
    graniteGray: "#666666",
    spanishGray: "#999999",
    white: "#FFFFFF",
    spaceCadetDark: "#28284F",
    spaceCadet: "#2D2B56",
    hanPurple: "#5E36F4",
    lightestGrey: "#F8F8F8",
    cultured: "#E1EFFF",
    violetWeb: "#F894FC",
    brinkPink: "#F5628D",
    celeste: "#9EFEFE"
  },
  screens: {
    mobile: "320px",
    tablet: "767px",
    laptop: "1025px",
    desktop: "1280px"
  },
  height: {
    eight: "8px",
    twelve: "12px",
    sixteen: "16px",
    twentyFour: "24px",
    thirtyTwo: "32px",
    fourtyEight: "48px"
  },
  space: {
    one: "8px",
    two: "12px",
    three: "16px",
    four: "24px",
    five: "32px",
    six: "48px"
  },
  font: {
    primary: "'Ubuntu', Arial, sans-serif",
    secondary: "'Fira Sans', Arial, sans-serif"
  }
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${theme.font.primary},${theme.font.secondary};
    background: ${theme.color.lightestGrey};
    color: ${theme.color.black};
  }

  code {
    font-family: 'Ubuntu mono', monospace;
  }

  .markdown-body p {
    margin-bottom: .8em;
  }

  .app-header {
    border-bottom: 3px solid ${theme.color.black};
    text-align: left;
    line-height: ${theme.height.fourtyEight};
  }

  .article-header {
    border-bottom: 3px solid ${theme.color.black};
    text-align: left;
  }

  .app-footer {
    background: ${theme.color.spaceCadetDark};
    color: ${theme.color.lightestGrey};

    & a {
      color: ${theme.color.lightestGrey}
    }
  }
`;
