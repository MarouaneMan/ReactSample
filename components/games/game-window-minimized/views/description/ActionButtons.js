import {NeutralButton, RegularButton} from 'components/ui';
import * as S from '../ActionButtons.style';
import {useTranslation} from 'react-i18next';
import {useMultiViewContext} from 'context/multi-view';
import {PlayButton, TrailerButton} from 'components/games';
import {If} from 'helpers';

export function ActionButtons({game, firstRender, onUnFavorite, onQuickMatch})
{
    const {t}       = useTranslation();
    const {setView} = useMultiViewContext();

    return (
        <S.Wrapper>
            <PlayButton
                game={game}
                defaultElement
                focusOnMount={!firstRender}
                disableMoveRight={true}/>
            <If condition={!onUnFavorite}>
                <TrailerButton game={game} disableMoveRight={true}/>
            </If>
            <If condition={game.hasQuickMatch}>
                <RegularButton onClick={() => onQuickMatch(game.index)} disableMoveRight={true}>{t('buttons.quick-match')}</RegularButton>
            </If>
            <RegularButton onClick={() => setView('more-view')} disableMoveRight={true}>{t('buttons.more')}</RegularButton>
            <If condition={onUnFavorite}>
                <NeutralButton onClick={() => onUnFavorite(game)}
                               title={t('buttons.unfavorite')}>{t('buttons.unfavorite')}</NeutralButton>
            </If>
        </S.Wrapper>
    );
}
