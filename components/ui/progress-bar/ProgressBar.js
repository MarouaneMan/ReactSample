import * as S from './ProgressBar.style';
import {useTransitionComplete} from 'hooks';

export function ProgressBar({progress, onProgressComplete})
{
    const ref = useTransitionComplete(() => {
        progress === 100 && onProgressComplete()
    }, [progress]);

    return (
        <S.Wrapper>
            <S.Progress ref={ref} progress={progress}/>
        </S.Wrapper>
    );
}
