import styled, {css} from 'styled-components';
import {IconClose2} from 'components/ui';
import Theme from 'app/theme';
import {mobile, tablet} from 'app/device';
import {withFocusable} from 'helpers';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  align-self: flex-start;
  ${mobile(css`
    margin-left: 10px;
  `)}
  user-select: none;
`;

export const Icon = withFocusable(styled.div`
  width: 70px;
  height: 70px;

  ${tablet(css`
    width: 45px;
    height: 45px;
  `)}

  margin-bottom: 16px;
  cursor: pointer;
  outline: none;

  &:focus, &:hover {
    svg {
      fill: ${Theme.COLORS.BLUE_L2} !important;
    }

    fill: ${Theme.COLORS.BLUE_L2} !important;
  }

  &:active {
    svg {
      fill: ${Theme.COLORS.BLUE_L3} !important;;
    }
  }
`);

export const IconClose = styled(IconClose2)`
  fill: rgba(255, 255, 255, 0.3);
`;
