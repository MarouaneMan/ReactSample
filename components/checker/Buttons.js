import styled, {css} from 'styled-components';
import {tv, mobile} from 'app/device';

export const Buttons = styled.div`
  display: flex;

  text-align: center;
  flex-direction: column;
  margin-top: 40px;

  width: 150px;

  & > :first-child {
    margin-bottom: 10px;
  }

  ${mobile(css`
    width: auto;
    margin-top: 20px;
    flex-direction: row;

    & > :first-child {
      margin-bottom: 0;
      margin-right: 10px;
    }
  `)}

  ${tv(css`
    margin-top: 64px;
    width: 200px;
  `)}
`;
