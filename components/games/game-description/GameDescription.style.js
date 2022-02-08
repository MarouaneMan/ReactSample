import styled, {css} from 'styled-components';
import {desktopSmall, mobile, mobileSmall, tablet} from 'app/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  ${mobile(css`
    height: 100%;
  `)}
`;

export const DescriptionWrapper = styled.div`
  margin-top: 36px;
  overflow-y: auto;
  padding-right: 0.35rem;

  ${tablet(css`
    margin-top: 14px;
  `)}

  ${mobile(css`
    flex: 1;
    overflow-y: auto;
    padding-right: 8px;
    margin-top: 14px;
  `)}
`;

export const DescriptionWrapperMinimized = styled.div`
  margin-top: 12px;

  font-size: 1.2rem;
  line-height: 1.6rem;

  ${tablet(css`
    margin-top: 14px;
  `)}

  ${mobile(css`
    flex: 1;
    padding-right: 8px;
    margin-top: 12px;
    font-size: 1.1rem;
    line-height: 1.3rem;
  `)}

  ${mobileSmall(css`
    font-size: 1rem;
    line-height: 1rem;
  `)}
`;

export const ExpandWrapper = styled.div`
  display: inline-block
`;

export const Description = styled.div`
  font-size: 1.2rem;
  line-height: 1.6rem;

  ${desktopSmall(css`
    font-size: 1rem;
    line-height: 1.25rem;
  `)}

  ${mobile(css`
    font-size: 1rem;
    line-height: 1.25rem;
  `)}
`;
