import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 1001;

  embed {
    width: 100%;
    height: ${props => props.showConsole ? '90%' : '100%'};
  }

  > div {
    position: absolute;
    top: 90%;
    left: 0;
    height: 10%;
    width: 100%;
    background-color: black;
    color: white;
    font-family: monospace;
    display: flex;
    flex-direction: row;

    div {
      flex-grow: 15;
      overflow-y: auto;
      user-select: text;
    }

    button {
      flex-grow: 1;
      overflow-wrap: break-word;
    }
  }

`;
