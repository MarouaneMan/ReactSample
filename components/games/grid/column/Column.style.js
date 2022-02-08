import styled from 'styled-components';

export const Column = styled.div`
  flex: 1;
  margin: 1vw;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  & > * {
    margin-bottom: 2vw;
  }
`;
