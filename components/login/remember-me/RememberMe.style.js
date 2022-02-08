import styled from 'styled-components';
import Theme from 'app/theme';
import {withFocusable} from 'helpers';
import * as CheckboxStyle from 'components/ui/checkbox/Checkbox.style';

export const Wrapper = withFocusable(styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  cursor: pointer;
  outline: none;
  color: ${Theme.COLORS.GRAY_L1};

  &:focus {
    color: ${Theme.COLORS.WHITE};
    ${CheckboxStyle.Switch} {
      ${CheckboxStyle.FocusStyle};
    }
  }
`);

export const Text = styled.span`
  font-size: 0.75rem;
  padding-left: 8px;
`;
