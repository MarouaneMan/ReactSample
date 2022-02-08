import styled, {css} from 'styled-components';
import {mobile, mobileSmall, tablet, tv} from 'app/device';
import {IconCrown} from 'components/ui';
import Theme from 'app/theme';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PlayerIcon = styled.div`
  position: relative;
  max-width: 120px;
  max-height: 175px;
  width: 10vw;
  height: 10vw;

  ${tablet(css`
    width: 8vw;
    height: 8vw;
  `)}
  
  ${mobile(css`
    width: 18vw;
    height: 18vw;
  `)}
  
  ${mobileSmall(css`
    width: 14vw;
    height: 14vw;
  `)}

  ${tv(css`
    max-width: 130px;
    max-height: 200px;
    width: 15vw;
    height: 15vw;
  `)}

  opacity: ${props => props.searching ? 0.3 : 1};
  fill: rgba(255, 255, 255, 0.9);
  user-select: none;
`;

export const PlayerIndex = styled.span`
  position: absolute;
  bottom: 0;
  font-size: calc(min(4rem, 4vw));

  ${tablet(css`
    font-size: calc(min(4rem, 3.5vw));
  `)}

  ${mobile(css`
    font-size: calc(min(4rem, 6vw));
  `)}
  
  ${tv(css`
    font-size: 3.5rem;
  `)}

  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  color: ${Theme.COLORS.GRAY_L2};
  opacity: 0.4;
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  ${mobile(css`
    margin-top: 6px;
  `)}
`;

export const Name = styled.span`
  font-size: 1.2rem;
  ${mobileSmall(css`
    font-size: 1rem;
  `)}
  margin: 6px 6px;
`;

export const MasterCrown = styled(IconCrown)`
  width: 24px;
  height: 24px;
  ${mobileSmall(css`
    width: 16px;
    height: 16px;
  `)}
`;
