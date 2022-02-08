import {ProgressBar} from 'components/ui';
import {useAnimationComplete} from 'hooks';
import * as S from './MegaProgressBar.style';

export function MegaProgressBar({progress, onProgressComplete, onVisible})
{
    const ref = useAnimationComplete(onVisible);

    return (
        <S.SlideUp ref={ref}>
            <ProgressBar progress={progress} onProgressComplete={onProgressComplete}/>
        </S.SlideUp>
    );
}
