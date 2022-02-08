import styled, {css} from 'styled-components';
import {LogoBase} from './Logo';
import {isTV, mobile} from 'app/device';

const LogoMediumBase = styled(LogoBase)`
  width: 94px;
  height: 82px;
`;

const LogoMediumResponsive = styled(LogoMediumBase)`
  ${mobile(css`
    width: 74px;
    height: 66px;
  `)}
`;

const LogoMediumTV = styled(LogoMediumBase)`
  width: 162px;
  height: 142px;
`;

export const LogoMedium = isTV ? LogoMediumTV : LogoMediumResponsive;
