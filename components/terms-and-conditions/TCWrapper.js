import styled, {css} from 'styled-components';
import {isTV, mobile} from 'app/device';

// Desktop base
const TCWrapperBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 900px;
  max-width: calc(100vw - 72px);
  max-height: calc(100vh - 72px);
  padding: 28px 12px;

  & > :first-child {
    margin-bottom: 24px;
  }
`;

// Mobile
const TCWrapperResponsive = styled(TCWrapperBase)`
  ${mobile(css`
    padding: 18px 12px;
    max-height: calc(100vh - 20px);
    max-width: calc(100vw - 20px);
  `)}
`;

// TV
const TCWrapperTV = styled(TCWrapperBase)`
  width: 1200px;
  padding: 32px 12px;

  & > :first-child {
    margin-bottom: 44px;
  }
`;

export const TCWrapper = isTV ? TCWrapperTV : TCWrapperResponsive;
