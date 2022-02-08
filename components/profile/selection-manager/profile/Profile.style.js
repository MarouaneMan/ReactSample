import styled, {css} from 'styled-components';
import {Avatar} from 'components/ui';
import {tv, mobile, mobileSmall, hover} from 'app/device';
import Theme from 'app/theme';
import {withFocusable} from 'helpers';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-width: 0;
  outline: none;
  flex: 1;
  flex-shrink: 0;
  user-select: none;

  margin: 0 20px;

  ${mobile(css`
    margin: 0 0;
  `)};

  ${tv(css`
    margin: 0 40px;
  `)}
`;

export const ProfileAvatar = withFocusable(styled(Avatar)`

  width: 144px;
  height: 144px;

  ${mobile(css`
    margin: ${props => props.count <= 3 ? '0 20px' : ' 0 0'};
    height: 120px;
    width: 120px;
  `)};

  ${mobileSmall(css`
    margin: ${props => props.count <= 2 ? '0 20px' : ' 0 0'};
    width: 90px;
    height: 90px;
  `)};

  ${tv(css`
    width: 244px !important;
    height: 244px !important;
  `)}
  &:focus {
    border-color: ${Theme.COLORS.BLUE_L1};
  }

  ${hover(css`
    &:hover {
      border-color: ${Theme.COLORS.BLUE_L2};
    }`
  )}
  
  &:active {
    border-color: ${Theme.COLORS.BLUE_L3};
  }
`);

export const Tag = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding: 4px 14px;
  margin-top: 8px;
  text-align: center;
  max-width: 110%;

  ${mobileSmall(css`
    padding: 2px 6px;
  `)};

  ${tv(css`
    margin-top: 18px;
    border-radius: 30px;
    padding: 14px 22px;
  `)}
`;

export const Text = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

export const Icon = styled.div`
  margin-left: 6px;
  width: 15px;
  ${tv(css`
    margin-left: 14px;
    width: 26px;
    height: 35px;
  `)}
`;
