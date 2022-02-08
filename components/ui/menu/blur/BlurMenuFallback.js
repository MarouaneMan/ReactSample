import React from 'react';
import * as S from './BlurMenuFallback.style';

export const BlurMenuBaseFallback = React.forwardRef(({children, ...props}, forwardedRef) => {
    return (
        <S.BlurMenuBaseFallback ref={forwardedRef} {...props}>
            <S.BlurMenuBaseFallbackBefore/>
            {children}
        </S.BlurMenuBaseFallback>
    );
});
