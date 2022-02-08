import styled, {css} from 'styled-components';
import {isTV, mobile} from 'app/device';

// Desktop base
const LoginBoxWrapperBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 430px;
  padding: 30px;
  box-sizing: border-box;
  max-width: calc(100vw - 20px);
`;

// Mobile
const LoginBoxWrapperResponsive = styled(LoginBoxWrapperBase)`
  ${mobile(css`
    width: 450px;
    padding: 15px;
  `)}
`;

// TV
const LoginBoxWrapperTV = styled(LoginBoxWrapperBase)`
  width: 710px;
  padding: 50px;
`;

export const LoginBoxWrapper = isTV ? LoginBoxWrapperTV : LoginBoxWrapperResponsive;
