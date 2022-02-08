import styled, {keyframes, css} from 'styled-components';
import {isTV, mobile} from 'app/device';

const animation = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
`;

export const LoginInputsWrapperBase = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 12px;
  min-height: 37px;
  
  & > :not(:last-child) {
    margin-right: 12px;
  }

  & > :not(:first-child) {
    flex-grow: 1;
  }

  & > * {
    animation: ${animation} 0.6s linear;
  }
`;

export const LoginInputsWrapperResponsive = styled(LoginInputsWrapperBase)`
  ${mobile(css`
    margin-top: 16px;
    margin-bottom: 10px;
  `)}
`;

const LoginInputsWrapperTV = styled(LoginInputsWrapperBase)`
  margin-top: 56px;
  margin-bottom: 16px;

  & > :not(:last-child) {
    margin-right: 20px;
  }
`;

export const LoginInputsWrapper = isTV ? LoginInputsWrapperTV : LoginInputsWrapperResponsive;
