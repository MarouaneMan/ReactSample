import styled, {css} from 'styled-components';
import {mobile, tv} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 0 20px;

  ${mobile(css`
    margin: 0 10px;
  `)}

  ${tv(css`
    margin: 0 60px;
  `)}
`;
