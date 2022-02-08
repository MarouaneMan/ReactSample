import styled, {css, keyframes} from 'styled-components';
import {hover, mobile, tv} from 'app/device';
import {BlurMenu} from './blur';
import {withFocusable} from 'helpers';

const flashingAnimation = keyframes`
  0% {
    opacity: 0.5;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const Wrapper = styled(BlurMenu)`
  display: flex;
  flex-direction: row;
  position: relative;
  flex: 1;

  & > :not(:last-child) {
    margin-right: 4px;
    ${mobile(css`
      margin-right: 2px;
    `)}
  }
`;

// menu cursor with focus
export const CursorItemBackgroundColor  = 'rgba(255, 255, 255, 0.15)';
export const CursorItemBoxShadow        = '1px 1px 30px -1px rgba(0, 0, 0, 0.15)';
// current menu item in unfocused menu bar
export const CurrentItemBackgroundColor = 'rgba(255, 255, 255, 0.075)';

export const Item = withFocusable(styled.div`
  padding: 14px;
  text-align: center;
  border-radius: 25px;
  cursor: pointer;
  flex: 1;
  font-size: 1.2rem;
  transition: font-weight 150ms ease-out;
  display: inline-block;
  text-align: center;

  &:before {
    display: block;
    content: ${props => props.content};
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden
  }

  &.flashing {
    animation: ${flashingAnimation} 500ms ease-out;
  }

  ${tv(css`
    border-radius: 30px;
  `)}
  ${mobile(css`
    padding: 8px;
    font-size: 1rem;
  `)}

  ${hover(css`
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }`
  )}

  outline: none;
`);

export const Cursor = styled.div`
  position: absolute;
  z-index: -1;
  border-radius: 25px;
  opacity: 0;
  background-color: rgba(255, 255, 255, 0.1);
  transition: transform 250ms ease-out;
`;
