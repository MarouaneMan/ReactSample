import styled from 'styled-components';
import {withFocusable} from 'helpers';
import THEME from 'app/theme';

export const RadioButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

export const ButtonRadio = withFocusable(styled.div`
  border-radius: 50%;
  height: 25px;
  width: 25px;
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 200ms ease-out;

  &:after {
    border-radius: 50%;
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    width: 18px;
    height: 18px;
    padding-bottom: 1px;
    padding-right: 1px;
    background-color: white;
    opacity: 0;
  }

  &.active {
    :after {
      opacity: 1;
    }
  }

  &:focus {
    outline: none;
    border: 1px solid ${THEME.COLORS.BLUE_L1};
  }
`);

export const RadioButtonLabel = styled.div`
  margin-left: 10px;
`;



