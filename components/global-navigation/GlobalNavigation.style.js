import styled, {css} from 'styled-components';
import {mobile, mobileSmall, tv} from 'app/device';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 900;
  top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  user-select: none;
`;

export const Content = styled.div`
  width: 98vw;
  max-width: 1500px;

  ${tv(css`
    width: 98vw;
    max-width: 98vw;
  `)}

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const SubContent = styled.div`
  width: 80vw;
  max-width: 1280px;

  ${tv(css`
    max-width: 90vw;
  `)}

  ${mobile(css`
    max-width: 90vw;
    min-width: 90vw;
  `)}

  ${mobileSmall(css`
    max-width: 98vw;
    width:auto;
  `)}
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuWrapper = styled.div`
  flex: 1;
  max-width: 1050px;
  ${mobile(css`
    max-width: 500px;
  `)}
  ${mobileSmall(css`
    max-width: 420px;
  `)}
`;

export const LogoWrapper = styled.div`
  width: 200px;
  ${mobile(css`
    max-width: 110px;
  `)}

  ${mobileSmall(css`
    max-width: 100px;
  `)}
`;

export const AsideNavWrapper = styled.div`

  display: flex;
  justify-content: flex-end;
  position: relative;
  
  width: 200px;

  ${mobile(css`
    max-width: 110px;
  `)}

  ${mobileSmall(css`
    max-width: 100px;
  `)}
`;
