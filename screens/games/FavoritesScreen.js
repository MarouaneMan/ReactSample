import {useRef} from 'react';
import {ColumnLayout} from 'components/ui';
import {GamesWrapper, GameWindow, GameWindowMinimized, Grid, LeadingGame, NoGamesFound} from 'components/games';
import {Scrollable} from 'components';
import {SpatialNavSection} from 'context';
import {useFavorites, useGameWindow} from 'hooks';
import {useTranslation} from 'react-i18next';
import {If} from 'helpers';
import {GlassTitle} from 'components/ui/glass-title/GlassTitle';
import {isMobile} from 'app/device';
import {BigTitleWrapper, GlassTitleWrapper} from 'components/ui/glass-title/GlassTitle.style';


export function FavoritesScreen()
{
    const {games, ...favorites} = useFavorites();
    const gameWindow            = useGameWindow(games);
    const {t}                   = useTranslation();
    const glassTitleWrapperRef  = useRef();

    return (
        <ColumnLayout alignItems="center" fullSize>
            {games.length > 0 && gameWindow.visible &&
            <GameWindow index={gameWindow.selectedIndex}
                        indexMax={games.length - 1}
                        defaultView={gameWindow.defaultView}
                        game={games[Math.min(Math.max(0, gameWindow.selectedIndex), games.length - 1)]}
                        onClose={gameWindow.close}
                        onPrev={gameWindow.prev}
                        onNext={gameWindow.next}
                        onUnFavorite={favorites.onUnFavorite}
                        swipeHandlers={gameWindow.handlers}
                        ref={gameWindow.gameWindowRef}/>
            }
            <GamesWrapper>
                <If condition={games.length <= 0}>
                    <NoGamesFound>
                        {t('favorites.no_games')}
                    </NoGamesFound>
                </If>
                <If condition={games.length > 0}>
                    <ColumnLayout fullWidth>
                        <LeadingGame>
                            <BigTitleWrapper>
                                <If condition={!isMobile}>
                                    <GlassTitleWrapper ref={glassTitleWrapperRef} isVisible={gameWindow.visible ? false : true}>
                                        <GlassTitle wrapperRef={glassTitleWrapperRef}>{t('favorites.title')}</GlassTitle>
                                    </GlassTitleWrapper>
                                </If>
                                <Scrollable isGapOpen={gameWindow.gapOpen} lastFocused={gameWindow.lastFocused}>
                                    <SpatialNavSection enterTo="default-element" animatable={true}>
                                        <GameWindowMinimized game={games[0]} onUnFavorite={favorites.onUnFavorite}
                                                             onQuickMatch={gameWindow.quickMatch}/>
                                    </SpatialNavSection>
                                </Scrollable>
                            </BigTitleWrapper>
                        </LeadingGame>
                        <Grid isGapOpen={gameWindow.gapOpen}
                              lastFocused={gameWindow.lastFocused}
                              onItemClicked={gameWindow.open}
                              columns={favorites.columns}/>
                    </ColumnLayout>
                </If>
            </GamesWrapper>
        </ColumnLayout>
    );
}
