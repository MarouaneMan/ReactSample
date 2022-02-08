import styled, {css} from 'styled-components';
import {mobile, tv} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  min-width: 436px;
  padding: 16px;

  ${mobile(css`
    min-width: 418px;
  `)}

  ${tv(css`
    min-width: 642px;
    padding: 32px;
  `)}
`;
