import styled, {css} from 'styled-components';
import {desktopSmall, mobile, tv} from 'app/device';

export const GamesWrapper = styled.div.attrs(() => ({
    id: 'GamesWrapper'
}))`

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  ${tv(css`
    width: 100vw;
  `)}

  ${mobile(css`
    width: 100vw;
  `)}

  //overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
`;

export const LeadingGame = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 0 auto;
  height: 60vh;
  flex-shrink: 0;
  padding-bottom: 50px;
  width: 1280px;

  ${desktopSmall(css`
    width: 100%;
    height: 80vh;
    padding-bottom: 30px;
  `)}

  ${mobile(css`
    width: 98vw;
    height: 80vh;
    padding-bottom: 20px;
  `)}

  ${tv(css`
    width: 100%;
    height: 65vh;
  `)}
`;

export const NoGamesFound = styled.div`
  margin-top: ${props => props.small ? '10vh' : '30vh'};
  font-size: 2rem;
  text-align: center;
  ${mobile(css`
    font-size: 1.4rem;
  `)}
`;

