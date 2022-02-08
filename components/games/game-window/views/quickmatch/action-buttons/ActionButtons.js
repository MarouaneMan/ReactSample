import {RegularButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import * as S from './ActionButtons.style';
import {useMultiViewContext} from 'context/multi-view';
import {JoinLobbyButton} from 'components/games/join-lobby/JoinLobbyButton';

export function ActionButtons({game})
{
    const {t}       = useTranslation();
    const {setView} = useMultiViewContext();

    return (
        <S.Wrapper>
            <JoinLobbyButton game={game} focusOnMount/>
            <RegularButton onClick={() => setView('description')} disableMoveRight={true}>{t('buttons.exit')}</RegularButton>
        </S.Wrapper>
    );
}
