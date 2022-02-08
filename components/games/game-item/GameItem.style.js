import styled, {css, keyframes} from 'styled-components';
import {withFocusable} from 'helpers';
import {hover, mobile, tv} from 'app/device';

const animation = keyframes`
  0% {
    opacity: 1;
    //transform: translateY(100vh);
    transform: translate3d(0, 100vh, 0) scale3d(1, 1, 1);
  }
  40% {
    //transform: translateY(-10vh);
    transform: translate3d(0, -10vh, 0) scale3d(1, 1, 1);
  }
  100% {
    opacity: 1;
    //transform: translateY(0);
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    animation: none;
  }
`;

// animation lighter on mobile - sometimes covers may touch menu bar - with backdrop blur effect it may product unwanted weird glitch (menu flashing)
const animationMobile = keyframes`
  0% {
    opacity: 1;
    //transform: translateY(100vh);
    transform: translate3d(0, 100vh, 0) scale3d(1, 1, 1);
  }
  40% {
    //transform: translateY(-10vh);
    transform: translate3d(0, -5vh, 0) scale3d(1, 1, 1);
  }
  100% {
    opacity: 1;
    //transform: translateY(0);
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    animation: none;
  }
`;

export const GameItem = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.srcImage})`,
        ...props.style
    }
}))`
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  width: 100%;
  padding-top: 100%;
  ${tv(css`
    border-radius: 30px;
  `)}
`;

export const GameItemTextFallback = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
  justify-content: center;
`;

export const GameGridItem = withFocusable(styled(GameItem).attrs(props => ({
    style: {
        backgroundImage: `url(${props.srcImage})`,
        animationDelay : ((props.colIndex + props.itemIndex + 1) * 70) + 'ms',
        ...props.style
    }
}))`

  width: 100%;
  outline: none;
  cursor: pointer;
  padding-top: ${props => props.odd ? '100%' : '137%'};
  transition: box-shadow 150ms ease-out;

  &:focus {
    box-shadow: inset 0 0 0 4px white;
    ${tv(css`
      box-shadow: inset 0 0 0 6px white;
    `)}
  }

  ${hover(css`
    &:hover {
      box-shadow: inset 0 0 0 4px white;
    }
  `)}

  opacity: 0;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-name: ${animation};
  animation-duration: 1000ms;
  backface-visibility: hidden;

  ${mobile(css`
    animation-name: ${animationMobile};
  `)}

  ${props => props.disableAnimation && css`
    animation: none;
    opacity: 1;
  `}

`);

export const TagsWrapper = styled.div`
  position: absolute;

  bottom: 16px;
  right: 16px;

  ${tv(css`
    bottom: 20px;
    right: 20px;
  `)}

  ${mobile(css`
    bottom: 12px;
    right: 12px;
  `)}
`;

export const favChange = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.3);
  }
  45% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
`;

export const FavoriteGridItem = styled.div`
  position: absolute;
  cursor: pointer;

  user-select: none;
  width: 32px;
  height: 32px;
  top: 10px;
  right: 12px;

  ${mobile(css`
    width: 24px;
    height: 24px;
  `)}
  ${tv(css`
    width: 40px;
    height: 40px;
  `)}
  svg {
    fill: ${props => props.checked ? 'white' : 'rgba(0,0,0,0.2)'};
    transition: fill 600ms ease-out;

    path {
      stroke-width: 2;
      stroke: ${props => props.checked ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)'};
      transition: stroke 600ms ease-out;
    }
  }

  &.animate {
    animation: ${favChange} 600ms ease-out;
  }
`;


export const FavoriteIcon = withFocusable(styled(FavoriteGridItem)`
  outline: none;

  &:focus, &:hover {
    transform: scale(1.2);
  }
`);
