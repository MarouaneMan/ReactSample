import styled, {css} from 'styled-components';
import {tv} from 'app/device';

export const Tag = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding: 7px 14px;
  text-align: center;

  ${tv(css`
    border-radius: 30px;
    padding: 10px 22px;
  `)}
`;

export const Text = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

export const Icon = styled.div`
  margin-left: 6px;
  width: 15px;
  height: 20px;
  ${tv(css`
    margin-left: 14px;
    width: 26px;
    height: 35px;
  `)}
`;
