import styled, {css} from 'styled-components';
import {Input} from 'components/ui';
import {tv} from 'app/device';

export const ProfileNameInput = styled(Input)`
  min-width: 0;
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
  margin: 0 6px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  ${tv(css`
    padding-top: 8px;
    padding-bottom: 8px;
    margin: 0 8px;
  `)}
`;
