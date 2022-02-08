import styled, {css} from 'styled-components';
import {mobile} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PlayersWrapper = styled.div`
  margin-top: 20px;
  max-height: 290px;
  background-color: rgba(255, 255, 255, 0.18);
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  flex: 1;
  ${mobile(css`
    border-radius: 30px;
  `)}
`;
