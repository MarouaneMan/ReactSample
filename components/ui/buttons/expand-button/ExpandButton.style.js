import styled from 'styled-components';
import {withFocusable} from 'helpers';
import Theme from 'app/theme';

export const Dot = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 5px;
  height: 5px;
`;

export const Wrapper = withFocusable(styled.div`
  background-color: rgba(255, 255, 255, 0.25);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 10px;
  border-radius: 50px;
  cursor: pointer;
  transition: 250ms background-color ease-out;

  &:active, &:focus {
    background-color: ${Theme.COLORS.BLUE_L1};
    outline: none;
  }

  ${Dot} {
    &:not(:last-of-type) {
      margin-right: 10px;
    }
  }
`);

