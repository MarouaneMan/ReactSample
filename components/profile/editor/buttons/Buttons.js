import styled, {css} from 'styled-components';
import {mobile} from 'app/device';

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: ${props => props.count === 2 ? '80%' : '90%'};
  
  ${mobile(css`
    width: 100%;
  `)}
  
  & > * {
    flex: 1;
    text-align: center;
    max-width: 100%;
  }

  & > :not(:last-child) {
    margin-right: 20px;
    ${mobile(css`
      margin-right: 16px;
    `)}
  }
`;
