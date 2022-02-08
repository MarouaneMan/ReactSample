import styled, {css, keyframes} from 'styled-components';
import {mobile, mobileSmall, tv} from 'app/device';

export const LeftPan = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  margin: 10px 20px;
  
  ${mobile(css`
    margin: 0 24px;
  `)}

  ${mobileSmall(css`
    margin: 0 10px;
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
  flex-direction: column;
  flex: 1;

  padding: 5px 20px 20px 0;

  ${tv(css`
    padding: 5px 25px 25px 0;
  `)}

  ${mobile(css`
    padding: 10px 10px 10px 0;
  `)}

  animation: ${appearAnimationKeyframes} 500ms linear;
  ${tv(css`
    animation: none;
  `)}
`;

