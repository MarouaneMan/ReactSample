import styled, {css} from 'styled-components';
import {mobile, isTV} from 'app/device';
import Theme from 'app/theme';


export const WelcomeMessageBase = styled.span`
  margin-top: 16px;
  margin-bottom: 32px;
  white-space: nowrap;
  color: ${Theme.COLORS.GRAY_L1};
`;

export const WelcomeMessageResponsive = styled(WelcomeMessageBase)`
  ${mobile(css`
    margin-top: 9px;
    margin-bottom: 12px;
  `)}
`;

export const WelcomeMessageTV = styled(WelcomeMessageBase)`
  margin-top: 28px;
  margin-bottom: 54px;
`;

export const WelcomeMessage = isTV ? WelcomeMessageTV : WelcomeMessageResponsive;
