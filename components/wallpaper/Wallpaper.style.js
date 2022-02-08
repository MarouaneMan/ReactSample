import styled from 'styled-components';

export const Wallpaper = styled.div.attrs((props) => ({
    style: {
        backgroundImage : `url(${props.theme.wallpaper})`,
        ...props.style,
    }
}))`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-color: black;
  background-size: cover;
  background-position: center;
  backface-visibility: hidden;
  pointer-events: none;
  overflow-x: hidden;
  transition:  background 1s ease-in-out;
`;
