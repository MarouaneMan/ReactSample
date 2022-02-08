import styled, {css} from 'styled-components';
import {BlurMenu} from 'components/ui/menu/blur';
import {mobile, tv} from 'app/device';
import Theme from 'app/theme';
import {withFocusable} from 'helpers';
import {BlurMenuBaseFallbackBefore} from 'components/ui/menu/blur/BlurMenuFallback.style';
import {favChange} from 'components/games/game-item/GameItem.style';

export const Icon = withFocusable(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 50px;
  width: 50px;
  outline: none;

  svg {
    fill: white;
    height: 30px;
  }

  ${mobile(css`
    height: 34px;
    width: 34px;

    svg {
      height: 20px;
    }
  `)}

  ${tv(css`
    width: 58px;
    height: 58px;

    svg {
      height: 32px;
    }
  `)}
`);

export const Wrapper = styled(BlurMenu)`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.2);

  ${mobile(css`
    height: 34px;
  `)}
  ${tv(css`
    height: 58px;
    border-radius: 30px;
  `)}
  &:hover {
    background-color: ${Theme.COLORS.BLUE_L1};
  }

  &:hover > ${BlurMenuBaseFallbackBefore} {
    display: none;
  }

  ${props => props.favoritesVisible && css`
    background-color: ${Theme.COLORS.BLUE_L1};

    & > ${BlurMenuBaseFallbackBefore} {
      display: none;
    }
  `}

  ${props => props.settingsVisible && css`
    ${SettingsIcon} {
      background-color: ${Theme.COLORS.BLUE_L2};
    }
  `}

  ${props => props.settingsState && css`
    background-color: rgba(255, 255, 255, 0.2) !important;
  `}
`;

export const SettingsIcon = styled(Icon)`

  &:focus, &:hover {
    background-color: ${Theme.COLORS.BLUE_L1};
  }

  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
`;

export const FavoriteIcon = styled(Icon)`
  padding-left: 6px;
  padding-right: 6px;

  svg {
    fill: ${props => props.checked ? 'white' : 'rgba(0,0,0,0.2)'};
    transition: fill 600ms ease-out;

    path {
      stroke-width: 2;
      stroke: ${props => props.checked ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)'};
      transition: stroke 600ms ease-out;
    }
  }

  ${mobile(css`
    padding-left: 4px;
    padding-right: 4px;
  `)}
  animation: ${favChange} 600ms
`;
