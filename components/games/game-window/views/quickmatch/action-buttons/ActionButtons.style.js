import styled, {css} from 'styled-components';
import {isMobile, mobile, mobileSmall} from 'app/device';

export const WrapperBase = styled.div`

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > * {
    margin-right: 16px;
    margin-top: 12px;
    padding: 0.7rem 1rem;
  }
`;

export const WrapperMobile = styled.div`

  display: flex;
  flex-direction: column;
  flex: 1;

  ${mobile(css`
    & > * {
      margin-top: 10px;
      margin-left: 10px;
      margin-right: 10px;
      min-width: unset;
      padding: 0.6rem 0;
    }
  `)}
  
  ${mobileSmall(css`
    & > * {
      margin-left: 6px;
      margin-right: 6px;
    }
  `)}
`;

export const Wrapper = isMobile ? WrapperMobile : WrapperBase;
