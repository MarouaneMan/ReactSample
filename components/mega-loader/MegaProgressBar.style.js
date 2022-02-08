import styled, {css, keyframes} from 'styled-components';
import {tv} from 'app/device';

const animation = keyframes`
  from {
    transform: translateY(70px);
  }
  to {
    transform: translateY(0);
  }
`;

const animationTV = keyframes`
  from {
    transform: translateY(116px);
  }
  to {
    transform: translateY(0);
  }
`;

export const SlideUp = styled.div`
  width: 100%;
  animation: ${animation} 0.6s linear;
  ${tv(css`
    animation: ${animationTV} 0.6s linear;
  `)}
`;
