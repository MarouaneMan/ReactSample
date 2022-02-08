import styled from 'styled-components';
import {Layout} from './Layout';

export const RowLayout = styled(Layout).attrs((props) => ({
    style: {
        flexDirection: 'row',
        ...props.style
    }
}))``;
