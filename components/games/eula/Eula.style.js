import styled, {css} from 'styled-components';
import {mobile, mobileSmall, tv} from 'app/device';
import {BlurBox, IconSpinner} from 'components/ui';

export const Wrapper = styled.div.attrs((props) => ({
  style: {
    backgroundImage : `url(${props.theme.wallpaper})`,
    ...props.style,
  }
}))`
  position: absolute;
  z-index: 901;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-color: black;
  background-size: cover;
`;

export const Box = styled(BlurBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 900px;
  max-width: calc(100vw - 72px);
  max-height: calc(100vh - 72px);
  padding: 28px 12px;

  & > :first-child {
    margin-bottom: 20px;
  }

  ${mobile(css`
    padding: 18px 12px;
    max-height: calc(100vh - 20px);
    max-width: calc(100vw - 20px);
  `)}

  ${tv(css`
    width: 1200px;
    padding: 32px 12px;

    & > :first-child {
      margin-bottom: 44px;
    }
  `)}
`;

export const FormatEula = styled.pre`
  font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  white-space: pre-wrap;
`;

export const Text = styled.div`
  padding: 0 28px;
  overflow-y: auto;
  text-align: center;
  box-sizing: border-box;
  scroll-behavior: smooth;

  h1 {
    margin: 0 0 24px;
    font-size: 1.8rem;
  }

  ${mobile(css`
    padding: 0 12px;

    h1 {
      font-size: 1.4rem;
    }
  `)}

  ${tv(css`
    padding: 0 32px;
  `)}
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;

  & > :first-child {
    margin-right: 28px;
  }

  ${mobile(css`
    margin-top: 0;
  `)}

  ${tv(css`
    margin-top: 32px;

    & > :first-child {
      margin-right: 60px;
    }
  `)}
`;

export const Spinner = styled(IconSpinner).attrs(() => ({
    color: 'white'
}))`

  margin-bottom: 0 !important;
  width: 60px;
  height: 60px;

  ${mobile(css`
    width: 40px;
    height: 40px;
  `)}

  ${mobileSmall(css`
    width: 30px;
    height: 30px;
  `)}
`;
