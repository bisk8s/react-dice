import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 * {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}

body {
  position: fixed;
  overflow: hidden;
  overscroll-behavior-y: none;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
  background-color: transparent;
}
`;

export default GlobalStyle;
