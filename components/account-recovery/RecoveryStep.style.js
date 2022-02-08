import styled, {css} from 'styled-components';
import THEME from 'app/theme';
import {isTV, tv} from 'app/device';
import {Input} from 'components/ui';

export const TitleWrapper = styled.div`
  margin-top: 12px;
  text-align: center;
  transition: opacity 250ms ease-out;

  &.disabled {
    opacity: 0.25;
  }
`;

export const RadioButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RadioButtonsInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const RadioButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-of-type {
    margin-bottom: 0.5rem;
  }

  input {
    display: block;
  }

  input {
    margin-right: 0.5rem;
  }

  label {
    cursor: pointer;
  }
`;

export const ContentWrapperBase = styled.div`
  margin: 22px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const InputPasswordConfirm = styled(Input)`
  margin-top: 0.625rem;
`;

export const ContentWrapperTV = styled(ContentWrapperBase)`
  margin: 40px 0;
  width: 100%;
  max-width: 350px;

  > input:first-of-type {
    margin-bottom: 12px;
  }
`;

export const InputsWrapper = styled.div`
  max-width: 220px;
  ${tv(css`
    max-width: 310px;
  `)}
  margin: 0 auto;
`;

export const ErrorWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 22px;
  color: ${THEME.COLORS.ORANGE_L1};
`;

export const PasswordErrorWrapper = styled.div`
  font-size: 0.75rem;
  margin: 1rem 0 0 0;
  color: ${THEME.COLORS.ORANGE_L1}
`;


export const ContentWrapper = isTV ? ContentWrapperTV : ContentWrapperBase;
