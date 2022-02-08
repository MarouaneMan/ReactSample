import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 1001;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: black;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const CloseButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  padding: 10px 4px 10px 10px;
  z-index: 1;
`;
