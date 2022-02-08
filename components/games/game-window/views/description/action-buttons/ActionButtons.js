import React from 'react';
import {NeutralButton, RegularButton} from 'components/ui';
import * as S from './ActionButtons.style';
import {useTranslation} from 'react-i18next';
import {useMultiViewContext} from 'context/multi-view';
import {PlayButton, TrailerButton} from 'components/games';
import {If} from 'helpers';
import {SpatialNavSection} from 'context';

export const ActionButtons = React.forwardRef(({game, onUnFavorite}, ref) => {

    const {t}       = useTranslation();
    const {setView} = useMultiViewContext();

    return (
        <SpatialNavSection defaultElement enterTo="default-element">
            <S.Wrapper hasQuickMatch={game.hasQuickMatch} isFavorite={!!onUnFavorite}>
                <PlayButton game={game} defaultElement/>
                <If condition={!onUnFavorite}>
                    <TrailerButton game={game}/>
                </If>
                <If condition={onUnFavorite}>
                    <NeutralButton onClick={() => onUnFavorite(game)}>{t('buttons.unfavorite')}</NeutralButton>
                </If>
                <If condition={game.hasQuickMatch}>
                    <RegularButton onClick={() => setView('quick-match')}>{t('buttons.quick-match')}</RegularButton>
                </If>
                <RegularButton onClick={() => setView('more-view')}>{t('buttons.more')}</RegularButton>
            </S.Wrapper>
        </SpatialNavSection>
    );
});
