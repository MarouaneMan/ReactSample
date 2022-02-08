import styled, {css} from 'styled-components';
import {mobile, mobileSmall, tv} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  user-select: none;

  max-width: 1280px;
  margin: 0 auto;

  ${tv(css`
    max-width: 100%;
  `)}

`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex:1;
  margin: 1vw;
  min-width: 0;

  &:first-child {
    //margin-left: 0;
  }

  &:last-child {
    //margin-right: 0;
  }

  ${tv(css`
    &:first-child {
      margin-left: 1vw;
    }

    &:last-child {
      margin-right: 1vw;
    }
  `)}

`;

export const PreTitle = styled.div`
  font-size: 1.1rem;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 2.2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  width: 100%;
  
  ${mobile(css`
    font-size: 1.4rem;
  `)}

  ${mobileSmall(css`
    font-size: 1.2rem;
  `)}
`;
