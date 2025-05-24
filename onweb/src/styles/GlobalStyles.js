import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Comic Sans MS', sans-serif; /* Fun, playful font */
    background-color: #87cefa; /* Light blue for an underwater vibe */
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Comic Sans MS', sans-serif;
  }

  button {
    font-family: 'Comic Sans MS', sans-serif;
  }
`;

export default GlobalStyle;
