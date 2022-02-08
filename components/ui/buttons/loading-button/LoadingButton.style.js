import styled, {css} from 'styled-components';
import {IconSpinner} from 'components/ui';
import {tv} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled(IconSpinner)`
  width: 12px;
  height: 12px;
  border-width: 3px;
  ${tv(css`
    border-width: 4px;
  `)}
`;

export const Text = styled.span`
  padding-left: 10px;
`;
