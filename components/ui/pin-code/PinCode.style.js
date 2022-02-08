import styled from 'styled-components';
import {withFocusable} from 'helpers';
import Theme from 'app/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 0.5rem !important;
  }
`;

export const DigitInput = withFocusable(styled.input.attrs(() => ({
    type     : 'number',
    size     : 1,
    maxLength: 1,
    min      : 0,
    onFocus  : (e) => e.target.select(),
}))`

  background-color: rgba(255, 255, 255, 0.25);
  outline: none;
  color: white;
  border-radius: 10px;
  text-align: center;
  margin: 0 !important;
  transition: border 200ms ease-out;
  border: 2px solid transparent;
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  height: 100%;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield; // Firefox

  &:focus {
    border-color: ${Theme.COLORS.BLUE_L2};
  }
`);

export const Clear = withFocusable(styled.div`
  flex: 1;
  cursor: pointer;
  outline: none;
  fill: white;
  display: flex;

  &:focus, &:hover {
    svg {
      fill: ${Theme.COLORS.BLUE_L2};
    }
  }

  &:active {
    svg {
      fill: ${Theme.COLORS.BLUE_L3};
    }
  }

`);
