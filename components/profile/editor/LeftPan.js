import styled, {css} from 'styled-components';
import {mobile, tv} from 'app/device';

export const LeftPan = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  width: 144px;
  margin-right: 16px;
  ${mobile(css`
    width: 140px;
  `)}
  ${tv(css`
    width: 218px;
    margin-right: 32px;
  `)}
`;
