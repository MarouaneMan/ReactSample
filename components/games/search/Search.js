import styled, {css} from 'styled-components';
import {mobile} from 'app/device';

export const SearchBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  height: 60vh;
  justify-content: flex-end;
  width: 800px;
  max-width: 98vw;
  margin-bottom: 30px;
  flex-shrink: 0;
  ${mobile(css`
    margin-top: 20vh;
    width: auto;
    min-width: 45vw;
  `)}
`;
