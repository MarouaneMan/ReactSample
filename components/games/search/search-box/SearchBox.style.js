import styled, {css} from 'styled-components';
import {BlurBox} from 'components/ui';
import {mobile, tv} from 'app/device';

export const Wrapper = styled(BlurBox)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  
  ${mobile(css`
    padding: 10px;
    min-width: 60vw;
  `)}
  
  ${tv(css`
    padding: 28px;
  `)}
`;

export const InputWrapper = styled.div`
  flex: 1;
  margin-right: 24px;

  & > input {
    box-sizing: border-box;
    width: 100%;
    height: 55px;

    padding: 0 1.2rem;
    font-size: 1.5rem;
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.35);
    
    ${mobile(css`
      height: 40px;
      font-size: 1.2rem;
      border-radius: 15px;
    `)}

    ${tv(css`
      height: 75px;
      border-radius: 30px;
    `)}
  }
`;

export const ButtonWrapper = styled.div`
  & > :first-child {
    padding: 1.4rem 1.5rem;
    border-radius: 20px;

    ${mobile(css`
      padding: 1rem 1.5rem;
    `)}
  }
`;
