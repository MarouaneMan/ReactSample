import styled, {css} from 'styled-components';
import {desktopSmall, mobile, mobileSmall, tv} from 'app/device';
import {BlurBox} from 'components/ui';

export const Wrapper = styled(BlurBox)`

  display: flex;
  overflow: hidden;
  max-width: calc((1280px * 80) / 100);
  justify-content: center;
  width: 98vw;
  
  ${desktopSmall(css`
    width: 85%;
    margin-right: 1vw;
  `)}

  --gameWindowHeight: 247px;

  ${mobile(css`
    --gameWindowHeight: 170px;
    width: 100%;
  `)}

  ${mobileSmall(css`
    --gameWindowHeight: 150px;
  `)}

  ${tv(css`
    max-width: 80%;
    width: 100%;
    margin: 0 1vw 0 0;

    --gameWindowHeight: 320px;
  `)}

  height: var(--gameWindowHeight);
`;

export const Cover = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: var(--gameWindowHeight);
  height: 100%;
`;

export const Window = styled.div`
  width: 100%;
  max-width: 1280px;
  ${tv(css`
    max-width: 100%;
  `)}
  height: var(--gameWindowHeight);
`;
