import styled, {css} from 'styled-components';
import {isTV, mobile} from 'app/device';

const WrapperBase = styled.div`
  margin-top: 16px;

  ${mobile(css`
    margin-top: 10px;
  `)}
`;

const WrapperTV = styled(WrapperBase)`
  margin-top: 25px;
`;

export const Wrapper = isTV ? WrapperTV : WrapperBase;
