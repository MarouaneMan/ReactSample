import styled, {css} from 'styled-components';
import {tv, mobile} from 'app/device';
import Theme from 'app/theme';

export const Heading = styled.h1`
  
  font-size: 1rem;
  
  font-weight: normal;
  margin-bottom: 26px;
  
  color: ${Theme.COLORS.GRAY_L1};

  ${mobile(css`
    margin-bottom: 22px;
  `)}

  ${tv(css`
    margin-bottom: 44px;
  `)}
`;
