import styled from 'styled-components';
import Theme from 'app/theme';
import {withFocusable} from 'helpers';

export const Text = withFocusable(styled.span`

  font-size: 0.75rem;
  cursor: pointer;
  user-select: none;
  outline: none;
  align-self: center;
  color: ${Theme.COLORS.GRAY_L1};
  transition: color 150ms ease-out;

  &:focus, &:hover {
    color: ${Theme.COLORS.BLUE_L2};
  }

  &:active {
    color: ${Theme.COLORS.WHITE};
  }
`);
