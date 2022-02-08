import styled, {css} from 'styled-components';
import Theme from 'app/theme';
import {mobile, tv} from 'app/device';

export const ScrollWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  -webkit-flex: 1 1 auto;
  overflow: auto;
  min-height: 0px;
  height: 100%;
`;

export const Copyright = styled.div`
  font-size: 1.2rem;
  flex: 1;
`;

export const ContentRatingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  color: ${Theme.COLORS.ORANGE_L1}
`;

export const ContentRatingIcon = styled.img`
  flex-shrink: 0;
  width: 63px;
  height: 82px;
  ${tv(css`
    width: 88px;
    height: 100px;
  `)}

  ${mobile(css`
    width: 80px;
    height: 92px;
  `)}
`;

export const WarningWrapper = styled.div`
  margin-left: 8px;
  ${tv(css`
    margin-left: 20px;
  `)}
  display: flex;
  flex-direction: column;
`;

export const WarningHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

export const WarningHeaderText = styled.h3`
  font-size: 1rem;
  margin: 0;
  font-weight: normal;
`;

export const WarningHeaderIcon = styled.div`
  width: 24px;
  margin-right: 10px;

  svg {
    fill: ${Theme.COLORS.ORANGE_L1};
  }
`;

export const WarningMessage = styled.p`
  font-size: 1rem;
  margin: 0;
`;
