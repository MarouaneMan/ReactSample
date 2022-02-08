import styled, {keyframes} from 'styled-components';

const animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const IconSpinner = styled.div.attrs(props => ({
    style: {
        borderColor: `${props.color} transparent ${props.color} transparent`,
        ...props.style
    }
}))`
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border-width: 6px;
  border-style: solid;
  animation: ${animation} 1.2s linear infinite;
`;

IconSpinner.defaultProps = {
    color: 'white'
};
