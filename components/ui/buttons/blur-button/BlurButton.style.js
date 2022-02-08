import styled, {css} from 'styled-components';
import Theme from 'app/theme';
import {withFocusable} from 'helpers';
import {tv} from 'app/device';

export const ButtonWrapper = styled.div`
  padding: 10px 15px;
  color: ${Theme.COLORS.GRAY_L4};
  text-align: center;
  transition: color 250ms ease-out, border 250ms ease-out;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 50px;
  // prevent shift when bolding text on active/hover/focus | attr title must match text inside btn in order to prevent shift
  &:before {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  ${tv(css`
    border: 2px solid rgba(0, 0, 0, 0);
  `)}

`;


export const FocusableWrapper = withFocusable(styled.div`

  &:focus, &:hover {
    outline: none;
    cursor: pointer;

    ${ButtonWrapper} {
      border: 1px solid ${Theme.COLORS.GRAY_L4};
      color: ${Theme.COLORS.BLUE_L1};

      ${tv(css`
        border: 2px solid ${Theme.COLORS.GRAY_L4};
      `)}
    }
  }
`);
