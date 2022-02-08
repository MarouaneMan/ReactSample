import styled, {css} from 'styled-components';
import Theme from 'app/theme';
import {mobileSmall} from '../../../app/device';

export const WelcomeTextWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
  line-height: 1.5rem;
  color: ${Theme.COLORS.GRAY_L1};

  ${mobileSmall(css`
    margin-top: 5px;
  `)}
`;
export const WelcomeText        = styled.div``;

export const AccountText = styled.div`
  font-size: 0.85rem;
`;
