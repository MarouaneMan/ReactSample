import * as S from './ScrollArea.style';
import {useScrollAreaContext} from 'context';

export function ScrollArea({children})
{
    const {onFocus, wrapperRef, ref} = useScrollAreaContext();

    return (
        <S.Wrapper ref={wrapperRef} onFocus={onFocus}>
            <S.ScrollArea ref={ref}>
                {children}
            </S.ScrollArea>
        </S.Wrapper>
    );
}

