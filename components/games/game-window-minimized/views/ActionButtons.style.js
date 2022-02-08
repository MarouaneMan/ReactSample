import styled, {css} from 'styled-components';
import {isMobile, mobile, mobileSmall, tablet} from 'app/device';
import * as LoadingButtonStyle from 'components/ui/buttons/loading-button/LoadingButton.style';

export const WrapperBase = styled.div`

  display: flex;
  flex-direction: column;
  
  & > * {
    margin-top: 10px;
    padding: 0.4rem 1rem;
  }
  
  ${tablet(css`
    & > * {
      margin-top: 8px;
      padding: 0.4rem 0.5rem;
      min-width: 110px;
    }
  `)}
`;

export const WrapperMobile = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${LoadingButtonStyle.Text} {
    padding-left:4px;
  }
  
  ${mobile(css`
    & > * {
      margin-top: 8px;
      min-width: 8rem;
      padding: 0.4rem 1rem;
    }
  `)}
  
  ${mobileSmall(css`
    ${LoadingButtonStyle.Text} {
      padding-left:2px;
    }

    & > * {
      margin-top: 5px;
      padding: 0.4rem 0.3rem;
      min-width: 6rem;
    }
  `)}
`;

export const Wrapper = isMobile ? WrapperMobile : WrapperBase;
