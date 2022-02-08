import styled, {css} from 'styled-components';
import {isTV, mobile} from 'app/device';

const TCTextBase = styled.div`
  padding: 0 28px;
  overflow-y: auto;
  text-align: center;
  box-sizing: border-box;
  scroll-behavior: smooth;
  h1 {
    margin: 0 0 24px;
    font-size: 1.4rem;
  }
`;

// Mobile
const TCTextResponsive = styled(TCTextBase)`
  ${mobile(css`
    padding: 0 12px;
  `)}
`;

// TV
const TCTextTV = styled(TCTextBase)`
  padding: 0 32px;
`;

export const TCText = isTV ? TCTextTV : TCTextResponsive;
