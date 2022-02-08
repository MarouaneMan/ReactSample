import styled from 'styled-components';
import Theme from 'app/theme';

export const BlurMenuBase = styled.div`
  backdrop-filter: ${() => `blur(${Theme.BLUR_AMOUNT}px) brightness(${Theme.LIGHT_BLUR_BRIGHTNESS}%)`};
  border-radius: 25px;
`;
