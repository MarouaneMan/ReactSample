import styled, {css} from 'styled-components';
import {mobile} from 'app/device';
import Theme from 'app/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  ${mobile(css`
    margin-top: 0;
  `)}
`;

export const Title = styled.span`
  text-align: right;
  font-weight: bold;
  font-size: 0.9rem;
  color: ${Theme.COLORS.ORANGE_L1};
`;

export const MaxPlayers = styled.span`
  text-align: right;
  font-weight: normal;
  font-size: 0.9rem;
  color: ${Theme.COLORS.ORANGE_L1};
`;

export const TitleIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 12px;

  svg {
    fill: ${Theme.COLORS.ORANGE_L1};
  }
`;
