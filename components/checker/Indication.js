import styled, {css} from 'styled-components';
import Theme from 'app/theme';
import {mobile} from 'app/device';

export const Indication = styled.span`
  margin-top: 0.6rem;
  font-size: 0.75rem;
  user-select: none;
  outline: none;
  align-self: center;
  color: ${Theme.COLORS.GRAY_L2};

  ${mobile(css`
    font-size: 1.05rem;
  `)}
`;
