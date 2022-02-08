import styled, {css} from 'styled-components';
import {tv} from 'app/device';
import Theme from 'app/theme';

export const FocusStyle = css`
  box-shadow: 0 0 0 1px #66baf9;
  ${tv(css`
    box-shadow: 0 0 0 2px #66baf9;
  `)}
`;

export const Switch = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.4s;
  border-radius: 20px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }

  ${tv(css`
    &:before {
      height: 28px;
      width: 28px;
      left: 3px;
      bottom: 3px;
    }
  `)}
`;

export const Checkbox = styled.input.attrs(() => ({type: 'checkbox'}))`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  outline: none;

  &:focus > :nth-child(2n) {
    ${FocusStyle}
  }

  ${tv(css`
    width: 54px;
    height: 34px;
  `)}
  
  ${Checkbox}:checked + ${Switch} {
    background-color: ${Theme.COLORS.BLUE_L1};
  }

  ${Checkbox}:checked + ${Switch}:before {
    
    transform: translateX(14px);

    ${tv(css`
      transform: translateX(20px);
    `)}
  }
  
`;
