import styled, {css} from 'styled-components';
import Theme from 'app/theme';
import {withFocusable} from 'helpers';
import {mobileSmall, tv} from 'app/device';

export const NavButton = withFocusable(styled.div`

  align-self: center;
  flex-shrink: 0;
  outline: none;
  cursor: pointer;
  width: 62px;
  height: 62px;
  
  margin-top: -16px;
  
  ${tv(css`
    width: 114px;
    height: 114px;
    margin-top: -50px;
  `)};

  ${mobileSmall(css`
    width: 45px;
    height: 45px;
  `)};

  svg {
    fill: ${Theme.COLORS.WHITE};
  }

  &:focus, &:hover {
    svg {
      fill: ${Theme.COLORS.BLUE_L2};
    }
  }

  &:active {
    svg {
      fill: ${Theme.COLORS.BLUE_L3};
    }
  }
`);

