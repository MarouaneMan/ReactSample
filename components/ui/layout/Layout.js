import styled from 'styled-components';

// Layout attributes
// fullWidth : width = 100%
// fullHeight : height = 100%
// fullSize : width and height = 100%
export const Layout = styled.div.attrs((props) => ({
    style: {
        justifyContent: props.justifyContent || 'unset',
        alignItems    : props.alignItems || 'unset',
        width         : (props.fullWidth || props.fullSize) ? '100%' : 'unset',
        height        : (props.fullHeight || props.fullSize) ? '100%' : 'unset',
        ...props.style,
    }
}))`
  display: flex;
  flex-direction: unset;
`;
