import styled from 'styled-components';
import Theme from 'app/theme';

export const BlurMenuBaseFallback = styled.div`
  border-radius: 35px;
  position: relative;
  overflow: hidden;
  z-index: 0;
`;

// ::before pseudo element cannot be used on Tizen Hospitality
export const BlurMenuBaseFallbackBefore = styled.div.attrs((props) => ({
    style: {
        backgroundImage: `url(${props.theme.wallpaper})`,
        ...props.style,
    }
}))`
  z-index: -1;
  position: absolute;
  top: ${() => `-${Theme.BLUR_AMOUNT}px`};
  left: ${() => `-${Theme.BLUR_AMOUNT}px`};
  right: ${() => `-${Theme.BLUR_AMOUNT}px`};
  bottom: ${() => `-${Theme.BLUR_AMOUNT}px`};
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  filter: ${() => `blur(${Theme.BLUR_AMOUNT / 2}px) brightness(${Theme.LIGHT_BLUR_BRIGHTNESS}%)`};
`;
