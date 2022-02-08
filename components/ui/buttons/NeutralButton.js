import styled from 'styled-components';
import {BaseButton} from './BaseButton';
import Theme from 'app/theme';

export const NeutralButton = styled(BaseButton)`
  color: ${Theme.COLORS.WHITE};
  background-color: rgba(255, 255, 255, 0.15);

  &:focus,
  &:hover {
    background-color: rgba(255, 255, 255, 0.30);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
