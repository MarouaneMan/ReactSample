import {createGlobalStyle, css} from 'styled-components';
import {tv} from 'app/device';
import {ScrollBarStyle} from 'components/ui/scroll-bar/ScrollBar';

export const GlobalStyle = createGlobalStyle`

  html, body {
    width: 100%;
    height: 100%;
    ${tv(css`
      font-size: 1.4rem;
    `)}
  }

  body {
    background-color: black;
    color: white;
    font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  }

  svg path {
    transition: fill 250ms ease-out;
  }

  #root {
    display: flex;
    width: 100%;
    height: 100%;
  }

  * {
    -webkit-tap-highlight-color: transparent !important;

    &:not(input) {
      user-select: none;
    }
  }


  .freeze {
    display: none !important;

    & * {
      display: none !important;
      animation: none !important;
      transition: none !important;
      background-image: none !important;
      backdrop-filter: none !important;
      filter: none !important;
    }
  }

  .pauseMouseInput {
    pointer-events: none !important;
  }

  ${ScrollBarStyle}
`;
