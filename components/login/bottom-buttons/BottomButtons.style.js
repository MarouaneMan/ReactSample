import styled, {css} from 'styled-components';
import {isMobile, mobile} from 'app/device';
import Theme from 'app/theme';

// Desktop base
export const WrapperBase = styled.div`
  position: absolute;
  width: 100%;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    margin-right: 10px;
  }
`;

// Mobile
const WrapperResponsive = styled(WrapperBase)`
  justify-content: space-between;
  margin-top: 20px;

  span {
    color: ${Theme.COLORS.GRAY_L2};
    font-size: 0.85rem;
    text-decoration: underline;
  }

  ${mobile(css`
    position: relative;
    bottom: 0;
  `)}

`;


export const Wrapper = isMobile ? WrapperResponsive : WrapperBase;
