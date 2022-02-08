import styled, {keyframes, css} from 'styled-components';
import {IconSpinner} from 'components/ui';
import Theme from 'app/theme';
import {tv} from 'app/device';

const animation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${animation} 0.2s linear;
`;

export const Spinner = styled(IconSpinner).attrs(() => ({
    color: Theme.COLORS.BLUE_L1
}))`
  
  width: 100px;
  height: 100px;
  
  ${tv(css`
    width: 140px;
    height: 140px;
  `)}
`;
