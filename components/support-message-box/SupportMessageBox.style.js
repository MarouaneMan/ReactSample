import styled, {css} from 'styled-components';
import {BlurBox} from '../ui';
import {mobile, tv} from 'app/device';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const BoxTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
`;

export const BoxTitle = styled.div`
  font-size: 1.5rem;
`;

export const Icon = styled.div`
  width: 1.25rem;
  display: inline-block;
  margin-right: 4px;

  svg {
    fill: white;
  }
`;

export const MessageBox = styled(BlurBox)`
  border-radius: 20px;
  max-width: 765px;
  margin: 0 auto;
  font-size: 1.25rem;
  padding: 24px;

  ${mobile(css`
    padding: 14px;
    font-size: 1.125rem;
  `)}

  ${tv(css`
    max-width: 40%;
  `)}
`;

export const BuildVersion = styled.div`
  line-height: 1.5rem;
  margin-bottom: 1.5rem;

  ${mobile(css`
    margin-bottom: 0;
  `)}
`;
export const Message      = styled.div`
  margin-bottom: 24px;
  line-height: 1.5rem;
`;

export const SupportLink = styled.a`
  color: #FFDA9F;
  font-style: italic;
`;

export const CloseWrapper = styled.div`
  text-align: center;

  > div {
    display: inline-block;
  }
`;
