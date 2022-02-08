import styled, {css} from 'styled-components';
import {mobile, tablet, tv} from 'app/device';
import Theme from 'app/theme';

export const Name = styled.h1`
  margin: 10px 0 0;
  padding: 0;
  text-transform: capitalize;

  font-size: 2.2rem;
  
  ${tv(css`
    font-size: 1.9rem;
  `)}
  
  ${tablet(css`
    font-size: 1.5rem;
  `)}
  
  ${mobile(css`
    margin: 0 0 0;
    font-size: 1.4rem;
  `)}
`;

export const Studio = styled.h2`
  color: ${Theme.COLORS.GRAY_L1};
  font-weight: normal;
  text-transform: capitalize;
  margin: 0;
  font-size: 1.2rem;
  padding-left: 4px;

  ${tablet(css`
    font-size: 1rem;
  `)}
  
  ${mobile(css`
    padding-left: 0;
  `)}
`;
