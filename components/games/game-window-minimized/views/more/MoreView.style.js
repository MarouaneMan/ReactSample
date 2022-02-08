import styled, {css} from 'styled-components';
import {mobile, mobileSmall} from 'app/device';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top:16px;
  
  & * {
    font-size: 1rem;
  }
  
  ${mobile(css`
    
    margin-top:0;

    & * {
      font-size: 0.8rem;
    }

    img {
      height: 80px;
    }
  `)}

  ${mobileSmall(css`
    & * {
      font-size: 0.7rem;
      margin: 0;
    }

    img {
      height: 60px;
      margin-right: 5px;
    }
  `)}
`;
