import styled, {css} from 'styled-components';
import {isTV, mobile} from 'app/device';

// Desktop base
const RecoveryBoxWrapperBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 430px;
  padding: 30px;
  box-sizing: border-box;
  max-width: calc(100vw - 20px);
`;

// Mobile
const RecoveryBoxWrapperResponsive = styled(RecoveryBoxWrapperBase)`
  ${mobile(css`
    width: 450px;
    padding: 25px;
  `)}
`;

// TV
const RecoveryBoxWrapperTV = styled(RecoveryBoxWrapperBase)`
  width: 710px;
  padding: 50px;
`;

export const RecoveryBoxWrapper = isTV
    ? RecoveryBoxWrapperTV
    : RecoveryBoxWrapperResponsive;
