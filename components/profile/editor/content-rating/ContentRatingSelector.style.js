import styled, {css} from 'styled-components';
import Theme from 'app/theme';
import {tv} from 'app/device';
import {withFocusable} from 'helpers';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  height: 26px;
  padding-top: 4px;

  ${tv(css`
    padding-top: 20px;
  `)}
`;

export const Item = withFocusable(styled.div`
  position: relative;
  font-size: 1rem;
  z-index: 1;
  text-align: center;
  cursor: pointer;
  border-radius: 50%;
  outline: none;
  box-sizing: border-box;
  border: 2px solid transparent;

  &:focus, &:hover {
    border-color: ${Theme.COLORS.BLUE_L2};
  }

  width: 26px;
  height: 26px;
  ${tv(css`
    width: 38px;
    height: 38px;
  `)}
`);

export const Text = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Cursor = styled.div`
  width: 26px;
  height: 26px;
  ${tv(css`
    width: 38px;
    height: 38px;
  `)}
  position: absolute;
  background-color: ${Theme.COLORS.BLUE_L1};
  border-radius: 50%;
  left: 0;
  opacity: 0;
  transition: all 0.2s ease-out;
`;
