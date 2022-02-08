import * as S from './GamesWrapper.style';
import {useFocusFollow} from 'hooks';

export function GamesWrapper({children, isGapOpen, ...props})
{
    const {ref, onFocus} = useFocusFollow(props);

    return (
        <S.GamesWrapper ref={ref} onFocus={onFocus}>
            {children}
        </S.GamesWrapper>
    );
}

export {LeadingGame, NoGamesFound} from './GamesWrapper.style';
