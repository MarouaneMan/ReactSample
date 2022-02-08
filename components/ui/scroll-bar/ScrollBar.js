import {css} from 'styled-components';

export const ScrollBarStyle = css`

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    //background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    box-shadow: inset 0 0 13px 12px rgba(255, 255, 255, 0.65);
    border: solid 3px transparent;
  }

  //::-webkit-scrollbar-thumb:hover {
  //  background: rgba(255, 255, 255, 0.1);
  //  background: rgba(0,0,0,0.4);
  //}

  ::-webkit-scrollbar-track {
    border: solid 3px transparent;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
  }
`;
