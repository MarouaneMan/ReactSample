import styled from 'styled-components';
import {isTV} from 'app/device';

const MegaLoaderWrapperBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 440px;
  padding: 18px;
  overflow: hidden;

  & > :first-child {
    margin-bottom: 1rem;
  }
`;

const MegaLoaderWrapperTV = styled(MegaLoaderWrapperBase)`
  width: 725px;
  padding: 36px;

  & > :first-child {
    margin-bottom: 2rem;
  }
`;

export const MegaLoaderWrapper = isTV ? MegaLoaderWrapperTV : MegaLoaderWrapperBase;
