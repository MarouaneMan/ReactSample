import styled, {css} from 'styled-components';
import {tv, mobile} from 'app/device';

export const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  min-width: 360px;
  min-height: 345px;
  box-sizing: border-box;
  
  ${mobile(css`
    padding: 26px;
    min-width: auto;
    min-height: 276px;
  `)}

  ${tv(css`
    padding: 45px;
    min-width: 600px;
  `)}
  
  input {
    margin-bottom: 10px;
  }
`;
