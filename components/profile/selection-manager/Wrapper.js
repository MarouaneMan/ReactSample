import styled, {css} from 'styled-components';
import {mobile, isTV, mobileSmall} from 'app/device';

const WrapperBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 48px;
  box-sizing: border-box;
`;

const WrapperResponsive = styled(WrapperBase)`
  ${mobile(css`
    padding: 16px 24px;
    min-width: ${props => props.count > 3 ? 'calc(100vw - 30px)' : 'unset'};
    max-width: ${props => props.count <= 3 ? 'calc(100vw - 30px)' : 'unset'};
  `)}

  ${mobileSmall(css`
    min-width: ${props => props.count > 2 ? 'calc(100vw - 30px)' : 'unset'};
    padding: 16px 18px;
  `)};
`;

const WrapperTV = styled(WrapperBase)`
  padding: 28px 90px;
`;

export const Wrapper = isTV ? WrapperTV : WrapperResponsive;
