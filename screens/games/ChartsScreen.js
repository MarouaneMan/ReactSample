import {useCharts, useGameWindow} from 'hooks';
import {GamesWrapper, GameWindow, Grid} from 'components/games';
import {Titles, TitlesWrapper} from 'components/games/charts';
import {ColumnLayout} from 'components/ui';
import {Scrollable} from 'components';
import {If} from 'helpers';
import {isMobile} from 'app/device';

export function ChartsScreen()
{
    const {colsTitles, columns, games} = useCharts();
    const gameWindow                   = useGameWindow(games);

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
            <GamesWrapper minTop={isMobile ? 250 : 350}>
                <ColumnLayout fullWidth>
                    <Scrollable isGapOpen={gameWindow.gapOpen} lastFocused={gameWindow.lastFocused}>
                        <TitlesWrapper>
                            <Titles colsTitles={colsTitles}/>
                        </TitlesWrapper>
                    </Scrollable>
                    <Grid isGapOpen={gameWindow.gapOpen}
                          lastFocused={gameWindow.lastFocused}
                          onItemClicked={gameWindow.open}
                          columns={columns}/>
                </ColumnLayout>
            </GamesWrapper>
        </ColumnLayout>
    );
}
