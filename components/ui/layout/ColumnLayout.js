import styled from 'styled-components';
import {Layout} from './Layout';

export const ColumnLayout = styled(Layout).attrs((props) => ({
    style: {
        flexDirection: 'column',
        ...props.style
    }
}))``;
