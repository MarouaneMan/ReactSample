import * as S from './TCText.style';
import {useRef} from 'react';
import {useDownPress, useUpPress} from 'hooks';

export function TCText({children})
{
    const ref = useRef();

    useUpPress(() => ref.current.scrollTop -= 60)
    useDownPress(() => ref.current.scrollTop += 60)

    return (
        <S.TCText ref={ref}>
            {children}
        </S.TCText>
    );
}
