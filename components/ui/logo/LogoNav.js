import LogoNavImage from 'assets/images/logo-nav.png';
import styled, {css} from 'styled-components';
import {tv, mobile, mobileSmall} from 'app/device';

export const LogoNav = styled.div.attrs((props) => ({
  style: {
    backgroundImage : `url(${LogoNavImage})`,
    ...props.style,
  }
}))`
  display: block;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  width: 187px;
  height: 61px;
  
  ${mobile(css`
    width: 108px;
    height: 36px;
  `)}

  ${mobileSmall(css`
    width: 100px;
    height: 35px;
  `)}

  ${tv(css`
    width: 210px;
    height: 70px;
  `)}
`;
