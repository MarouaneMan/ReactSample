import styled, {css} from 'styled-components';
import {LogoBase} from './Logo';
import {isTV, mobile} from 'app/device';

const LogoSmallBase = styled(LogoBase)`
  width: 90px;
  height: 74px;
`;

const LogoSmallResponsive = styled(LogoSmallBase)`
  ${mobile(css`
    width: 77px;
    height: 64px;
  `)}
`;

const LogoSmallTV = styled(LogoSmallBase)`
  width: 127px;
  height: 107px;
`;

export const LogoSmall = isTV ? LogoSmallTV : LogoSmallResponsive;
