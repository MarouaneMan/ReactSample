import styled, {css} from 'styled-components';
import {mobile, tv} from 'app/device';
import Theme from 'app/theme';

export const Instruction = styled.span`
  margin-top: 2px;
  margin-bottom: 22px;
  white-space: nowrap;
  color: ${Theme.COLORS.GRAY_L1};
  user-select: none;
  
  ${mobile(css`
    margin-bottom: 12px;
  `)}

  ${tv(css`
    font-size: 1.2rem;
    margin-bottom: 46px;
  `)}
`;

