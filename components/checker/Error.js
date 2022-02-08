import styled, {css} from 'styled-components';
import Theme from 'app/theme';
import {tv, mobile} from 'app/device';

export const Error = styled.span`
  color: ${Theme.COLORS.ORANGE_L1};
  font-size: 1rem;

  margin-bottom: 26px;

  ${mobile(css`
    margin-bottom: 22px;
  `)}

  ${tv(css`
    margin-bottom: 44px !important;
  `)}

`;
