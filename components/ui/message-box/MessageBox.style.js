import styled, {css} from 'styled-components';
import Theme from 'app/theme';
import {mobile, supportBackDropFilter} from 'app/device';
import {BlurBox} from 'components/ui/blur-box';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;;
`;

const BlurredWallpaperBase = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: ${() => `blur(${Theme.BLUR_AMOUNT}px) brightness(${Theme.DARK_BLUR_BRIGHTNESS}%)`};
`;

const BlurredWallpaperTV      = styled(BlurredWallpaperBase).attrs((props) => ({
    style: {
        backgroundImage: `url(${props.theme.wallpaper})`,
        ...props.style,
    }
}))`
  background-repeat: no-repeat;
  background-color: black;
  background-size: cover;
`;
export const BlurredWallpaper = !supportBackDropFilter ? BlurredWallpaperTV : BlurredWallpaperBase;

// Message box
const MessageBoxBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.25rem;
  padding: 1.25rem;
  font-size: 1.3rem;
  backdrop-filter: ${() => `blur(${Theme.BLUR_AMOUNT * 1.5}px) brightness(140%)`};

  text-align: center;
  max-width: 60vw;

  ${mobile(css`
    max-width: 75vw;
  `)}
`;

const MessageBoxTV = styled(BlurBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.25rem;
  padding: 1.25rem;
  font-size: 1.3rem;
`;

export const MessageBox = !supportBackDropFilter ? MessageBoxTV : MessageBoxBase;


// Message Wrapper
export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.938rem;
`;

export const Text = styled.div`
  align-self: flex-end;
  padding-bottom: 0.25rem;
  margin-left: 0.75rem;
`;

export const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  svg {
    fill: white
  }
`;

export const MultipleMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.938rem;

  ${Icon} {
    margin-bottom: 0.938rem;
  }

  ${Text} {
    align-self: auto;
  }
`;
