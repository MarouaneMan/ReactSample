import styled, {css, keyframes} from 'styled-components';
import {isAndroid, isTV, mobile, mobileSmall, tv} from 'app/device';
import {BlurBox} from 'components/ui';

const appearAnimation = keyframes`
  from {
    transform: scale(0.5);
  }

  to {
    transform: scale(1);
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  z-index: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${mobile(css`
    align-items: flex-end;
    bottom: 0;
    margin-bottom: 10px;
  `)}
  
  ${mobileSmall(css`
    margin-bottom: 3px;
  `)}
  
  width: 100vw;
  height: 100vh;
`;

export const Window = styled(BlurBox)`

  display: flex;
  overflow: hidden;

  width: 90vw;
  max-width: 1280px;

  --gameWindowMaxHeight: 500px;
  --gameWindowHeight: 30vw;

  ${mobile(css`
    --gameWindowHeight: 85vh;
  `)}

  ${tv(css`
    --gameWindowMaxHeight: 600px;
    --gameWindowHeight: 600px;
  `)}

  ${tv(css`
    max-width: 1700px;
  `)}

  ${mobile(css`
    width: 98%;
  `)}

  height: var(--gameWindowHeight);
  max-height: var(--gameWindowMaxHeight);

  animation: ${!(isTV || isAndroid) ? appearAnimation : 'none'} 200ms linear;
`;

