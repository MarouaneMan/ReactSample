import {BlurBox} from 'components/ui';
import styled, {css} from 'styled-components';
import {mobile, mobileSmall, tv} from 'app/device';
import Theme from 'app/theme';
import {withFocusable} from 'helpers';

export const Wrapper = styled(BlurBox)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 0;
  min-width: 225px;
  box-sizing: border-box;
  padding: 20px 30px;
  z-index: 1;
  ${mobile(css`
    padding: 16px 26px;
  `)}
  ${tv(css`
    min-width: 310px;
    padding: 32px 38px 16px;
  `)}
`;

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const SettingsIcon = styled.div`
  fill: white;
  width: 20px;
  height: 20px;
  ${tv(css`
    width: 25px;
    height: 30px;
  `)}
`;

export const SettingsText = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  padding-left: 4px;
  margin: 0;
  ${mobileSmall(css`
    font-size: 1.2rem;
  `)}

  ${tv(css`
    padding-left: 6px;
  `)}
`;

export const Buttons = styled.div`
  div:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;

export const QuitWrapper = withFocusable(styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
  cursor: pointer;
  &:focus, &:hover {
    background-color: rgba(255,255,255,0.1);
  }
  outline: none;
  border-radius: 25px;
  padding:4px 8px;
`);

export const QuitIcon = styled.div`
  svg {
    fill: ${Theme.COLORS.GRAY_L1}
  }

  width: 32px;
  height: 34px;
`;

export const QuitText = styled.div`
  color: ${Theme.COLORS.GRAY_L1};
  font-size:1.1rem;
  padding-left: 2px;
`;
