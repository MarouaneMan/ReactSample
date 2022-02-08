import styled, {css} from 'styled-components';
import {mobile, tv} from 'app/device';
import {withFocusable} from 'helpers';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 901;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  ${tv(css`
    background-color: black;
  `)}

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoWrapper = styled.div`
  position: relative;
`;

export const Close = withFocusable(styled.div`
  position: absolute;
  z-index: 1;
  width: 35px;
  height: 35px;
  right: -16px;
  top: -16px;
  outline: none;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 50%;
  cursor: pointer;
  
  ${mobile(css`
    width: 30px;
    height: 30px;
    right: -12px;
    top: -10px;
  `)}
`);

export const Video = styled.video`
  outline: none;
  width: 70vw;
  height: calc(70vw / (16/9));
  ${tv(css`
    width: 100vw;
    height: 100vh;
  `)}

  ${mobile(css`
    width: 90vw;
  `)}
  
  background-color:#0a0a0ae8;
`;
