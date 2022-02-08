import styled, {css} from 'styled-components';
import Theme from 'app/theme';
import {tv} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.div`
  width: 20px;
  height: 20px;
  ${tv(css`
    width: 26px;
    height: 26px;
  `)}
  
  svg {
    fill: ${Theme.COLORS.GRAY_L1}
  }
`;

export const Text = styled.span`
  padding-left: 6px;
  line-height: 20px;

  ${tv(css`
    padding-left: 8px;
    line-height: 26px;
  `)}
`;
