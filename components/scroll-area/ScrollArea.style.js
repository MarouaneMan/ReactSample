import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const Transition = `transform 250ms ease-out`

export const ScrollArea = styled.div`
  width: 100%;
  transition: ${Transition};
`;
