import styled, {css} from 'styled-components';
import {mobile, mobileSmall, tv} from 'app/device';

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  margin-top: 26px;
  margin-bottom: 40px;

  ${tv(css`
    margin-top: 42px;
    margin-bottom: 57px;
  `)}

  ${mobile(css`
    margin-top: 28px;
    margin-bottom: 34px;
  `)}

  ${mobileSmall(css`
    margin-top: 16px;
    margin-bottom: 16px;
  `)}

`;
