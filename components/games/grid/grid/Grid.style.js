import styled, {css} from 'styled-components';
import {tv, mobile} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1280px;
  max-width: 98vw;
  margin: 0 auto;

  ${mobile(css`
    width: 100%;
  `)}

  ${tv(css`
    width: 100%;
  `)}
`;
