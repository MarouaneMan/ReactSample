import styled, {css} from 'styled-components';
import {tv, mobile, mobileSmall} from 'app/device';

export const PinCodeWrapper = styled.div`
  width: 146px;
  height: 36px;

  ${tv(css`
    width: 258px;
    height: 63px;
  `)}

  ${mobile(css`
    width: 172px;
    height: 46px;
  `)}

  ${mobileSmall(css`
    width: 172px;
    height: 34px;
  `)}
`;
