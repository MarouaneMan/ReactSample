import styled from 'styled-components';
import {BaseButton} from './BaseButton';
import Theme from 'app/theme';

export const DangerButton = styled(BaseButton)`
  background-color: ${Theme.COLORS.RED_L1};

  &:focus, &:hover {
    background-color: ${Theme.COLORS.RED_L2};
  }

  &:active {
    background-color: ${Theme.COLORS.RED_L3};
  }
`;
