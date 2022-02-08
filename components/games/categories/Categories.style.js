import styled, {keyframes, css} from 'styled-components';
import {mobile, tv} from 'app/device';

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  40% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const CategoryTitle = styled.div`
  margin-top: 180px;
  width: 1280px;
  max-width: 98vw;
  margin-right: auto;
  margin-left: auto;
  align-self: flex-start;
  font-size: 2.5rem;
  text-transform: capitalize;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  opacity: 0;

  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-name: ${animation};
  animation-duration: 450ms;

  ${mobile(css`
    margin-top: 100px;
    font-size: 1.5rem;
    margin-left: 0.5rem;
  `)}

  ${mobile(css`
    margin-top: 80px;
    font-size: 1.3rem;
  `)}

  ${tv(css`
    width: 98vw;
  `)}
`;
