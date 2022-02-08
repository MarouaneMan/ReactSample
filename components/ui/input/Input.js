import styled from 'styled-components';
import {isTV} from 'app/device';
import {withFocusable} from 'helpers';
import Theme from 'app/theme';

const InputBase = withFocusable(styled.input`
  padding: 0.438rem 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  position: relative;
  color: #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0);
  transition: border 250ms ease-out;
  font-size: 1rem;
  outline: none;
  min-width: 0;
  border: 2px solid transparent;

  &:hover {
    // BLUE_L2
    box-shadow: 0 0 0 1px rgba(102, 186, 249, 0.5); /* emulate the border */
  }

  &:focus {
    outline: none;
    border-color: ${Theme.COLORS.BLUE_L2};
  }

  &::placeholder {
    //color: #9f9f9f;
    color: ${Theme.COLORS.GRAY_L1};
  }
`);

InputBase.defaultProps = {
    type: 'text'
};

const InputTV = styled(InputBase)`
  padding: 0.52rem 0.75rem;
`;

export const Input = isTV ? InputTV : InputBase;
