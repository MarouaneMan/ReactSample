import styled from 'styled-components';
import Theme from 'app/theme';

export const BlurBoxBase = styled.div`
  backdrop-filter: ${() => `blur(${Theme.BLUR_AMOUNT}px) brightness(${Theme.DARK_BLUR_BRIGHTNESS}%)`};
  background-color: rgba(150, 150, 150, 0.1);
  border-radius: 20px;
`;
