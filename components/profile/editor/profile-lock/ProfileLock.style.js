import styled, {css} from 'styled-components';
import {mobile, tv} from 'app/device';
import {withFocusable} from 'helpers';
import * as CheckboxStyle from 'components/ui/checkbox/Checkbox.style';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-radius: 20px;
  margin-top: 16px;
  padding: 12px;
  flex-grow: 1;

  justify-content: space-between;
  ${tv(css`
    margin-top: 32px;
  `)}
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & > :first-child {
    margin-right: 8px;

    ${tv(css`
      margin-right: 20px;
    `)}
  }
`;

export const Text = styled.span`
  font-size: 1rem;
`;

export const LockCheckbox = withFocusable(styled.div`
  outline: none;
  
  &:focus {
    ${CheckboxStyle.Switch} {
      ${CheckboxStyle.FocusStyle};
    }
  }
`);

export const PinCodeWrapper = styled.span`
  position: relative;
  width: 148px;
  height: 35px;

  ${tv(css`
    width: 186px;
    height: 50px;
  `)}

  ${mobile(css`
    width: 135px;
    height: 35px;
  `)}
`;
