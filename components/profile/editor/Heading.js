import styled, {css} from 'styled-components';
import {tv} from 'app/device';

export const Heading = styled.div`
  font-size: 1.5rem;
  user-select: none;
  
  ${tv(css`
    font-size: 1.7rem;
  `)}
`;
