import styled, {css} from 'styled-components';
import {LogoSmall} from 'components/ui';
import {mobile} from 'app/device';

export const TCLogo = styled(LogoSmall)`
  ${mobile(css`
    display:none;
  `)}
`;
