import {GamesWrapper, GameWindow, Grid, NoGamesFound} from 'components/games';
import {Scrollable} from 'components';
import {useTranslation} from 'react-i18next';
import {ColumnLayout} from 'components/ui';
import * as S from 'components/games/categories';
import {useGameWindow} from 'hooks';
import {If} from 'helpers';
import {isTV} from 'app/device';

export function CategoryScreen({games, columns, tab})
{
    const gameWindow = useGameWindow(games);
    const {t}        = useTranslation();

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
            <GamesWrapper minTop={isTV ? 350 : 250}>
                <If condition={games.length <= 0}>
                    <NoGamesFound>
                        {t('categories.no_games')}
                    </NoGamesFound>
                </If>
                <If condition={games.length > 0}>
                    <ColumnLayout fullWidth>
                        <Scrollable isGapOpen={gameWindow.gapOpen} lastFocused={gameWindow.lastFocused}>
                            <S.CategoryTitle key={tab}>
                              {t(`categories.${tab.toLowerCase()}`)}
                            </S.CategoryTitle>
                        </Scrollable>
                        <Grid isGapOpen={gameWindow.gapOpen}
                              lastFocused={gameWindow.lastFocused}
                              onItemClicked={gameWindow.open}
                              columns={columns}/>
                    </ColumnLayout>
                </If>
            </GamesWrapper>
        </ColumnLayout>
    );
}
