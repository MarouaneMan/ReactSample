import styled from 'styled-components';
import {BaseButton} from './BaseButton';
import Theme from 'app/theme';

export const PrimaryButton = styled(BaseButton)`
  background-color: ${Theme.COLORS.BLUE_L0};
  color: ${Theme.COLORS.BLACK};
  font-weight: bold;
  
  &:focus,
  &:hover {
    background-color: ${Theme.COLORS.BLUE_L1};
    color: ${Theme.COLORS.WHITE};
  }

  &:active {
    background-color: ${Theme.COLORS.BLUE_L2};
    color: ${Theme.COLORS.WHITE};
  }
`;
