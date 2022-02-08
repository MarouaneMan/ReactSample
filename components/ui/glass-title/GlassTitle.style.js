import styled, {keyframes, css} from 'styled-components';
import {tablet, tv} from 'app/device';

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-35%, 0, 0);
  }
  10% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate3d(105%, 0, 0);
  }
`;

export const WrapperBase = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  font-weight: bold;
  font-size: 15rem;

  //animation
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-name: ${animation};
  animation-duration: 120s;

  ${tablet(css`
    font-size: 10rem;
  `)}

`;

export const Wrapper = styled(WrapperBase)`
  backdrop-filter: blur(6px) saturate(120%);
  background: rgba(255, 255, 255, 0.1);
  clip-path: url(#lockup-headline-mask-path);
`;

export const WrapperTV = styled(WrapperBase)`
  color: rgba(255, 255, 255, 0.1);
`;

export const Text = styled.div`

`;

export const Title = styled.span`
  visibility: hidden;
  position: absolute;
  top: -9999px;
  left: -9999px;
`;

export const GlassTitleWrapper = styled.div`
  position: absolute;
  top: -87%;
  left: 0;
  z-index: -1;
  opacity: 0;

  ${tablet(css`
    top: -55%;
  `)}

  ${tv(css`
    top: -95%;
  `)}

  ${props => props.isVisible && css`
    opacity: 1
  `}
`;

export const BigTitleWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  z-index: 1;

  ${tv(css`
    margin: 0;
  `)}

  ${props => props.isSearch && css`
    justify-content: center;
    flex-direction: column;

    ${GlassTitleWrapper} {
      top: -200px;

      ${tablet(css`
        top: -140px;
      `)}

      ${tv(css`
        top: -110%;
      `)}
    }
  `}

`;


