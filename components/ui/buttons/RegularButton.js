import styled from 'styled-components';
import {BaseButton} from './BaseButton';
import Theme from 'app/theme';

export const RegularButton = styled(BaseButton)`
  background-color: ${props => props.dark ? Theme.COLORS.GRAY_L0 : Theme.COLORS.GRAY_L1};
  color: ${Theme.COLORS.BLACK};

  &:focus,
  &:hover {
    background-color: ${Theme.COLORS.BLUE_L1};
    color: ${Theme.COLORS.WHITE};
  }

  &:active {
    background-color: ${Theme.COLORS.GRAY_L1};
    color: ${Theme.COLORS.WHITE};
  }
`;
