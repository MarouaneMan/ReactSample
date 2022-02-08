import styled, {css} from 'styled-components';
import {tv} from 'app/device';

export const Avatar = styled.img`
  display: flex;
  box-sizing: border-box;
  border-radius: 25px;
  border-width: 4px;
  border-style: solid;
  border-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
  cursor: pointer;
  -webkit-touch-callout: none;

  ${tv(css`
    border-width: 5px;
    border-radius: 32px;
  `)};
`;

