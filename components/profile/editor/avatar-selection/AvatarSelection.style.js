import styled, {css} from 'styled-components';
import {mobile, mobileSmall, tablet, tv} from 'app/device';
import {withFocusable} from 'helpers';
import {Avatar} from 'components/ui';
import Theme from 'app/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px;
  user-select: none;
  ${tv(css`
    padding: 46px;
  `)}

  ${mobile(css`
    padding: 16px;
  `)}
`;

export const Text = styled.span`
  margin-top: 2px;
  margin-bottom: 22px;
  white-space: nowrap;
  color: ${Theme.COLORS.GRAY_L2};
  user-select: none;

  ${mobile(css`
    margin-bottom: 12px;
  `)}

  ${tv(css`
    font-size: 1.2rem;
    margin-bottom: 46px;
  `)}
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  & > :first-child {
    margin-right: 20px;
    ${tv(css`
      margin-right: 28px;
    `)}
  }
`;

export const AvatarsGrid = styled.div`
  width: 880px;
  height: 440px;

  ${tv(css`
    width: 1264px;
    height: 632px;
  `)}

  ${tablet(css`
    width: 424px;
    height: 212px;
  `)}

  ${mobileSmall(css`
    width: 320px;
    height: 160px;
  `)}

  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  margin: 0 14px 14px 14px;
`;

export const AvatarItem = withFocusable(styled(Avatar)`
  width: 196px;
  height: 196px;
  border-width: 6px;
  margin: 12px;

  &:focus {
    border-color: white;
  }

  ${tv(css`
    width: 268px;
    height: 268px;
    margin: 24px;
  `)}

  ${tablet(css`
    width: 94px;
    height: 94px;
    margin: 6px;
    border-width: 4px;
  `)}

  ${mobileSmall(css`
    width: 72px;
    height: 72px;
    margin: 4px;
    border-width: 2px;
    border-radius: 16px;
  `)}
`);

