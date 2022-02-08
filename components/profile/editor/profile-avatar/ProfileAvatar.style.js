import styled, {css} from 'styled-components';
import {hover, mobile, tv} from 'app/device';
import Theme from 'app/theme';
import {withFocusable} from 'helpers';
import {Avatar} from 'components/ui/avatar/Avatar';

export const Wrapper = withFocusable(styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  outline: none;

  width: 144px;
  height: 144px;

  ${mobile(css`
    width: 140px;
    height: 140px;
  `)}
  
  ${tv(css`
    width: 218px;
    height: 218px;
  `)}
  
  &:focus {
    ${Avatar} {
      border-color: ${Theme.COLORS.BLUE_L1};
    }
  }

  ${hover(css`
    &:hover {
      ${Avatar} {
        border-color: ${Theme.COLORS.BLUE_L2};
      }
    }
  `)}
  

  &:active {
    ${Avatar} {
      border-color: ${Theme.COLORS.BLUE_L3};
    }
  }

  margin-bottom: 12px;

  ${tv(css`
    margin-bottom: 18px;
  `)}
`);


export const Icon = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;

  width: 30px;
  height: 30px;
  right: 10px;
  bottom: 10px;

  ${tv(css`
    width: 44px;
    height: 44px;
    bottom: 11px;
    right: 14px;
  `)}
  svg {

    fill: white;
    width: 18px;
    height: 18px;
    margin-left: 4px;

    ${tv(css`
      width: 27px;
      height: 27px;
      margin-left: 5px;
    `)}
  }

`;
