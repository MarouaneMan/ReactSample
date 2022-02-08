import LogoImage from 'assets/images/logo.png';
import styled, {css} from 'styled-components';
import {isTV, mobile, mobileSmall} from 'app/device';

export const LogoBase = styled.div.attrs((props) => ({
    style: {
        backgroundImage: `url(${LogoImage})`,
        ...props.style,
    }
}))`
  display: block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 160px;
  height: 135px;
  transition: 200ms;
  transition-property: width, height;
  flex-shrink: 0;
`;

const LogoResponsive = styled(LogoBase)`
  ${mobile(css`
    width: 87px;
    height: 74px;
  `)}

  ${mobileSmall(css`
    width: 67px;
    height: 54px;
  `)}
`;

const LogoTV = styled(LogoBase)`
  width: 206px;
  height: 174px;
`;

export const Logo = isTV ? LogoTV : LogoResponsive;
