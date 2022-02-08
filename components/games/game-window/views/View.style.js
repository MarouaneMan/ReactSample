import styled, {css, keyframes} from 'styled-components';
import {mobile, mobileSmall, tv} from 'app/device';

export const LeftPan = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: var(--gameWindowHeight);
  max-width: var(--gameWindowMaxHeight);;

  height: 100%;

  ${mobile(css`
    width: 150px;
    //padding-bottom: 8px;
  `)}

  ${mobileSmall(css`
    width: 110px;
  `)}
`;

const appearAnimationKeyframes = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const RightPan = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  padding: 20px 20px 20px 38px;

  ${tv(css`
    padding: 25px 25px 25px 50px;
  `)}

  ${mobile(css`
    padding: 10px 10px 10px 24px;
  `)}

  ${mobileSmall(css`
    padding-left: 18px;
  `)}

  animation: ${appearAnimationKeyframes} 500ms linear;
  ${tv(css`
    animation: none;
  `)}
`;

