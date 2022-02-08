import styled, {css} from 'styled-components';
import {mobile, tv} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-radius: 20px;
  margin-top: 4px;
  padding: 12px;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;

  ${mobile(css`
    padding: 8px;
  `)}

  ${tv(css`
    margin-top: 5px;
    padding: 20px;
    border-width: 3px;
  `)}
`;

export const Text = styled.span`
  font-size: 1rem;
`;
