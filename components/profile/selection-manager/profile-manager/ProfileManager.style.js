import styled, {css} from 'styled-components';
import {tv} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.h1`
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0 0 0 10px;
  ${tv(css`
    font-size: 2rem;
  `)}
`;

export const Icon = styled.div`
  width:30px;
  svg {
    fill: white;
  }
`;
