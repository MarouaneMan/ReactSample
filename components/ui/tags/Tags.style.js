import styled, {css} from 'styled-components';
import {mobile, tv} from 'app/device';

export const Tag = styled.div`
  border-radius: 50px;
  color: white;
  position: relative;
  font-weight: bold;
  background-color: ${props => props.color};

  padding: 2px 15px 3px 15px;

  ${mobile(css`
    padding-left: 10px;
    padding-right: 10px;
  `)}

  ${tv(css`
    padding-left: 20px;
    padding-right: 20px;
  `)}

`;

export const TagsWrapper = styled.div`
  display: flex;
  width: 100%;

  ${Tag}:nth-child(1) {
    z-index: 2
  }

  ${Tag}:nth-child(2) {
    padding-left: 25px;

    margin-left: -18px;

    ${mobile(css`
      margin-left: -20px;
    `)}

    ${tv(css`
      margin-left: -30px;
      padding-left: 40px;
    `)}
  }
`;
