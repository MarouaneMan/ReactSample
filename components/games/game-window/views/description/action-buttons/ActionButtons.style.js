import styled, {css} from 'styled-components';
import {isMobile, mobile, mobileSmall, tablet, tv} from 'app/device';
import i18n from 'i18n';

export const WrapperBase = styled.div`

  display: flex;

  ${props => props.hasQuickMatch && css`

    flex-direction: row;
    flex-wrap: wrap;
    max-width: ${i18n.language === 'fr' && props.isFavorite ? '400px' : '350px'};  // TODO : change flex layout instead of hardCoding width values

    & > :nth-child(1) {
      order: 1;
    }

    & > :nth-child(2) {
      order: 3;
    }

    & > :nth-child(3) {
      order: 2;
    }

    & > :nth-child(4) {
      order: 4;
    }

    ${tablet(css`
      max-width: unset;
    `)}

    ${tv(css`
      max-width: 500px;
    `)}
  `}
  ${props => !props.hasQuickMatch && css`
    flex-direction: column;
    align-self: flex-start;
  `}
  & > * {
    margin-right: 8px;
    margin-top: 12px;
    padding: 0.7rem 1rem;
    flex: 1;
  }

  ${tablet(css`
    & > * {
      padding: 0.7rem 0.5rem;
      min-width: 110px;
    }
  `)}

  ${tv(css`
    justify-content: space-between;
  `)}
`;

export const WrapperMobile = styled.div`

  display: flex;
  //justify-content: space-evenly;
  flex-direction: column;
  flex: 1;

  ${mobile(css`

    & > * {
      margin-top: 8px;
      margin-left: 8px;
      margin-right: 8px;
      min-width: unset;
      padding: 0.4rem 0;
    }
  `)}

  ${mobileSmall(css`
    & > * {
      margin-top: 6px;
      margin-left: 4px;
      margin-right: 4px;
    }
  `)}
  
  // Removes React warning, hasQuickMatch prop is passed to dom node
  // if it is not used in the styled component
  ${props => props.hasQuickMatch && css``}
`;

export const Wrapper = isMobile ? WrapperMobile : WrapperBase;
