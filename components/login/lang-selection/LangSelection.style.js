import styled from 'styled-components';
import {isTV} from 'app/device';

const LangSelectionWrapperBase = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;

  & > :not(:last-child) {
    margin-right: 10px;
  }
`;

const LangSelectionWrapperTV = styled(LangSelectionWrapperBase)`
  & > :not(:last-child) {
    margin-right: 20px;
  }
`;

export const LangSelectionWrapper = isTV ? LangSelectionWrapperTV : LangSelectionWrapperBase;
