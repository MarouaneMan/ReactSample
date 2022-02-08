import styled, {css} from 'styled-components';
import {withFocusable} from 'helpers';
import {mobileSmall} from 'app/device';

export const RootButton = styled.div`
  font-weight: ${(props) => (props.bold ? 'bold' : 'regular')};
  font-size: 1rem;
  padding: 0.625rem 1.5rem;
  cursor: pointer;
  outline: none !important;
  border: none;
  border-radius: 50px;
  color: white;
  min-width: 8.5rem;
  text-align: center;
  box-sizing: border-box;
  user-select: none;
  
  // text ellipsis
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  /** text scale */
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;

  // prevent shift when bolding text on active/hover/focus | attr title must match text inside btn in order to prevent shift
  &:before {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  
  &:hover,
  &:focus,
  &:active {
    font-weight: bold; // TODO find a solution to the layout shift
    ${mobileSmall(css`
      font-weight: normal;
    `)}
    transform: scale3d(1.045, 1.045, 1.045); // 1.09
  }

  /** transition */
  transition: background-color 200ms ease-out, color 200ms ease-out, font-size 200ms ease-out,
  transform 200ms ease-out;
`;

export const BaseButton = withFocusable(RootButton);
