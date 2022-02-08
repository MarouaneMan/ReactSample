import {MostSearched, SearchBox, SearchBoxWrapper} from 'components/games/search';
import {GamesWrapper, GameWindow, Grid, NoGamesFound} from 'components/games';
import {Scrollable} from 'components';
import {useGameWindow, useSearch} from 'hooks';
import {ColumnLayout} from 'components/ui';
import {If} from 'helpers';
import {useRef, useState} from 'react';
import {useSpatialNavContext} from 'context';
import {BigTitleWrapper, GlassTitleWrapper} from 'components/ui/glass-title/GlassTitle.style';
import {isMobile} from 'app/device';
import {GlassTitle} from 'components/ui/glass-title/GlassTitle';
import {useTranslation} from 'react-i18next';

export function SearchScreen()
{
    const {games: searchGames, columns, onSearch, cues, currentCue, mostSearchedGames} = useSearch();
    const [games, setGames]                                                            = useState(searchGames);
    const gameWindow                                                                   = useGameWindow(games);
    const cuesRef                                                                      = useRef();
    const glassTitleWrapperRef                                                         = useRef();
    const {setFocus}                                                                   = useSpatialNavContext();
    const {t}                                                                          = useTranslation();

    const openWindowWithGameList = gameList => index => {
        setGames(gameList);
        gameWindow.open(index);
    };

    return (
        <ColumnLayout alignItems="center" fullSize>
            <If condition={gameWindow.visible}>
                <GameWindow index={gameWindow.selectedIndex}
                            indexMax={games.length - 1}
                            defaultView={gameWindow.defaultView}
                            game={games[gameWindow.selectedIndex]}
                            onClose={gameWindow.close}
                            onPrev={gameWindow.prev}
                            onNext={gameWindow.next}
                            swipeHandlers={gameWindow.handlers}
                            ref={gameWindow.gameWindowRef}/>
            </If>
            <GamesWrapper>
                <ColumnLayout fullWidth>
                    <Scrollable isGapOpen={gameWindow.gapOpen} lastFocused={gameWindow.lastFocused}>
                        <SearchBoxWrapper>
                            <BigTitleWrapper isSearch={true}>
                                <If condition={!isMobile}>
                                    <GlassTitleWrapper ref={glassTitleWrapperRef} isVisible={!gameWindow.visible}>
                                        <GlassTitle wrapperRef={glassTitleWrapperRef}>{t('navigation.search')}</GlassTitle>
                                    </GlassTitleWrapper>
                                </If>
                                <SearchBox currentCue={currentCue}
                                           onMoveDown={() => cuesRef.current ? setFocus(cuesRef.current) : null}
                                           onSearch={onSearch}/>
                                <MostSearched ref={cuesRef} cues={cues} onCueSelected={onSearch} MostSearchedGames={mostSearchedGames}
                                              onItemClicked={openWindowWithGameList(mostSearchedGames)}/>
                            </BigTitleWrapper>
                        </SearchBoxWrapper>
                    </Scrollable>
                    <If condition={searchGames.length <= 0 && currentCue !== ''}>
                        <NoGamesFound small={true}>
                            {t('search.no_games')}
                        </NoGamesFound>
                    </If>
                    <If condition={searchGames.length > 0}>
                        <Grid isGapOpen={gameWindow.gapOpen}
                              lastFocused={gameWindow.lastFocused}
                              onItemClicked={openWindowWithGameList(searchGames)}
                              columns={columns}
                              key={currentCue}
                        />
                    </If>
                </ColumnLayout>
            </GamesWrapper>
        </ColumnLayout>
    );
}
