import {PrimaryButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import * as S from './ActionButtons.style';
import {useMultiViewContext} from 'context/multi-view';
import {EulaButton} from 'components/games';

export function ActionButtons({game})
{
    const {t}       = useTranslation();
    const {setView} = useMultiViewContext();

    return (
        <S.Wrapper>
            <PrimaryButton focusOnMount onClick={() => setView('description')}>{t('buttons.ok')}</PrimaryButton>
            <EulaButton game={game}/>
        </S.Wrapper>
    );
}
