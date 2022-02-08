import styled from 'styled-components';
import {isTV} from 'app/device';
import Theme from 'app/theme';
import {withFocusable} from 'helpers';

const LangIconBase = withFocusable(styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  box-sizing: border-box;

  &:focus {
    border: 2px solid ${Theme.COLORS.BLUE_L1};
  }
`);

const LangIconTV = styled(LangIconBase)`

  width: 55px;
  height: 55px;

  &:focus {
    border-width: 4px;
  }
`;

export const LangIcon = isTV ? LangIconTV : LangIconBase;

