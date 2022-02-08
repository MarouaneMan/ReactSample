import styled, {css} from 'styled-components';
import {mobile, mobileSmall} from 'app/device';

export const TitlesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 130px;
  flex-shrink: 0;
  ${mobile(css`
    margin-top: 60px;
  `)}

  ${mobileSmall(css`
    margin-top: 60px;
  `)}
`;
