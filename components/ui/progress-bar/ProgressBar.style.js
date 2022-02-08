import styled from 'styled-components';
import {isTV} from 'app/device';

const WrapperBase = styled.div`
  width: 100%;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding: 0.25rem;
  box-sizing: border-box;
`;

const WrapperTV = styled(WrapperBase)`
  height: 32px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Progress = styled.div.attrs(props => ({
    style: {
        width : `${props.progress}%`,
        ...props.style
    },
}))`
  height: 100%;
  border-radius: 1rem;
  background-color: #AFB7B9; // TODO: fix this, not documented
  transition: width 0.5s linear;
`;

export const Wrapper = isTV ? WrapperTV : WrapperBase;
