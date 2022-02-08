import React from 'react';
import * as S from './BlurBoxFallback.style';

export const BlurBoxFallback = React.forwardRef(({children, ...props}, forwardedRef) => {
    return (
        <S.BlurBoxFallback ref={forwardedRef} {...props}>
            <S.BlurBoxFallbackBefore/>
            {children}
        </S.BlurBoxFallback>
    );
});
