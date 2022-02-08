import styled, {css} from 'styled-components';
import {hover, mobile, mobileSmall, tv} from 'app/device';
import {withFocusable} from 'helpers';
import Theme from 'app/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const MostSearchedCuesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  ${tv(css`
    * {
      font-size: 1rem;
    }
  `)}
`;

export const MostSearchedCuesLabel = styled.div`
  margin-right: 40px;
  ${mobileSmall(css`
    margin-right: 20px;
  `)}
`;

export const CuesWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Cue = withFocusable(styled.div`
  user-select: none;
  padding: 2px 10px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.35);
  margin: 4px;
  outline: none;
  cursor: pointer;

  ${tv(css`
    padding: 6px 14px;
    border-radius: 24px;
  `)}
  &:focus, &:hover {
    background-color: ${Theme.COLORS.BLUE_L1}
  }
`);

export const MostSearchedGames = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 18px;

  ${mobile(css`
    margin-top: 8px;
  `)}
  
  > div:not(:last-of-type) {
    margin-right: 20px;
  }
`;

export const GameThumbnailWrapper = styled.div`
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const GameThumbnailItem = withFocusable(styled.div.attrs(props => ({
    style: {
      backgroundImage: `url(${props.srcImage})`,
      ...props.style
    }
}))`
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 34px;
  width: 100%;
  padding-top: 100%;
  transition: box-shadow 100ms ease-out;

  ${mobile(css`
    border-radius: 16px;
  `)}
  &:focus, &:active {
    outline: none;
    box-shadow: inset 0 0 0 4px white;
    ${tv(css`
      box-shadow: inset 0 0 0 4px white;
    `)}
  }

  ${hover(css`
    &:hover {
      cursor: pointer;
      box-shadow: inset 0 0 0 4px white;
    }
  `)}

`);
