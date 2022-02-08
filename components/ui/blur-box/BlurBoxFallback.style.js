import styled from 'styled-components';
import Theme from 'app/theme';

export const BlurBoxFallback = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 0;
  backdrop-filter: none;
  border-radius: 40px;
  background-color: transparent;
`;

export const BlurBoxFallbackBefore = styled.div.attrs((props) => ({
    style: {
        backgroundImage: `url(${props.theme.wallpaper})`,
        ...props.style,
    }
}))`
  z-index: -1;
  position: absolute;
  top: ${() => `-${Theme.BLUR_AMOUNT * 2}px`};
  left: ${() => `-${Theme.BLUR_AMOUNT * 2}px`};
  right: ${() => `-${Theme.BLUR_AMOUNT * 2}px`};
  bottom: ${() => `-${Theme.BLUR_AMOUNT * 2}px`};
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  filter: ${() => `blur(${Theme.BLUR_AMOUNT}px) brightness(${Theme.DARK_BLUR_BRIGHTNESS_TV}%)`};
`;
