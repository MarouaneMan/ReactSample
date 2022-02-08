import React from 'react';
import * as S from './Checkbox.style';

export const Checkbox = React.forwardRef((props, ref) => {
    return (
        <S.Wrapper>
            <S.Checkbox ref={ref} {...props}/>
            <S.Switch/>
        </S.Wrapper>
    );
});

