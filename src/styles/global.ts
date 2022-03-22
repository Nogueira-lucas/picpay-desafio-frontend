import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--color-background);
    color: var(--color-text);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font-family: 'Roboto', serif;
    font-size: 16px;
    outline: 0;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  body,html {
    margin: 0;
    padding: 0;
  }

  :root {
    --color-background: #F2F2F2;
    --color-primary: #007DFE;
    --color-warning: #c53030;

    --color-header: #002d69;
    --color-logo: #2f82dd;
    --color-text: #333333;
    --color-border: #e8ebf2;
    --color-placeholder: #b7b7cc;
    --color-cam-icon: #487eb0;
    --color-table: #f5f8fa;
    --color-hover: #f5f5f5;

    --color-gray: #A3A3A3;
    --color-white: #FFFFFF;
    }
`;
