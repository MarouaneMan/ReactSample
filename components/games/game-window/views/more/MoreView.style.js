import styled, {css} from 'styled-components';
import {tv} from 'app/device';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  
  & > :nth-child(2) {
    margin-top:20px;
    ${tv(css`
      margin-top:40px;
    `)}
  }
`;
