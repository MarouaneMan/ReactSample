import styled from 'styled-components';
import {isTV} from 'app/device';

const TCButtonsBase = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 40px;
  & > :first-child {
    margin-right: 28px;
  }
`;

const TCButtonsResponsive = styled(TCButtonsBase)`
  margin-top: 20px;
`;

const TCButtonsTV = styled(TCButtonsBase)`
  margin-top: 32px;
  
  & > :first-child {
    margin-right: 60px;
  }
`;

export const TCButtons = isTV ? TCButtonsTV : TCButtonsResponsive;
