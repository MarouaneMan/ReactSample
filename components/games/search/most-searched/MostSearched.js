import React from 'react';
import * as S from './MostSearched.style';
import {useTranslation} from 'react-i18next';
import {SpatialNavSection} from 'context';
import {assetURL, If} from 'helpers';

export const MostSearched = React.forwardRef(({cues, onCueSelected, MostSearchedGames, onItemClicked, gridGamesCounter},
                                              forwardedRef) => {
    const {t} = useTranslation();

    return (

        <S.Wrapper>
            <If condition={cues.length > 0}>
                <S.MostSearchedCuesWrapper>
                    <S.MostSearchedCuesLabel>
                        {t('search.most_researched')}
                    </S.MostSearchedCuesLabel>
                    <SpatialNavSection>
                        <S.CuesWrapper ref={forwardedRef}>
                            {cues.map((entry, index) =>
                                <S.Cue key={`${entry}-${index}`} onClick={() => onCueSelected(entry.name)}>{entry.name}</S.Cue>
                            )}
                        </S.CuesWrapper>
                    </SpatialNavSection>
                </S.MostSearchedCuesWrapper>
            </If>
            <SpatialNavSection>
                <S.MostSearchedGames>
                    {MostSearchedGames.map((game) => {
                        return (
                            <S.GameThumbnailWrapper key={game.alias}>
                                <S.GameThumbnailItem
                                    onClick={() => onItemClicked(game.index)}
                                    srcImage={game.assets.cover ? assetURL(game.assets.cover) : ''}/>
                            </S.GameThumbnailWrapper>
                        );
                    })}
                </S.MostSearchedGames>
            </SpatialNavSection>
        </S.Wrapper>
    );
});
