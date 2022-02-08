import {useRef} from 'react';
import {Scrollable} from 'components';
import {ColumnLayout} from 'components/ui';
import {GlassTitle} from 'components/ui/glass-title/GlassTitle';
import {BigTitleWrapper, GlassTitleWrapper} from 'components/ui/glass-title/GlassTitle.style';
import {GamesWrapper, GameWindow, GameWindowMinimized, Grid, LeadingGame} from 'components/games';
import {SpatialNavSection} from 'context';
import {useGameWindow, useHighLights} from 'hooks';
import {If} from 'helpers';
import {isMobile} from 'app/device';
import {useTranslation} from 'react-i18next';


export function HighLightsScreen()
{
    const {highlighted, columns, games} = useHighLights();
    const gameWindow                    = useGameWindow(games);
    const glassTitleWrapperRef          = useRef();
    const {t}                           = useTranslation();

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
            <GamesWrapper isGapOpen={gameWindow.gapOpen}>
                <ColumnLayout fullWidth>
                    {highlighted &&
                    <LeadingGame>
                        <BigTitleWrapper>
                            <If condition={!isMobile}>
                                <GlassTitleWrapper ref={glassTitleWrapperRef} isVisible={gameWindow.visible ? false : true}>
                                    <GlassTitle wrapperRef={glassTitleWrapperRef}>{t('navigation.highlights')}</GlassTitle>
                                </GlassTitleWrapper>
                            </If>
                            <Scrollable isGapOpen={gameWindow.gapOpen} lastFocused={gameWindow.lastFocused}>
                                <SpatialNavSection style={{background: 'red'}} enterTo="default-element" animatable={true}>
                                    <GameWindowMinimized game={highlighted} onExpandClicked={gameWindow.open} onQuickMatch={gameWindow.quickMatch}/>
                                </SpatialNavSection>
                            </Scrollable>
                        </BigTitleWrapper>
                    </LeadingGame>
                    }
                    <Grid isGapOpen={gameWindow.gapOpen}
                          lastFocused={gameWindow.lastFocused}
                          onItemClicked={gameWindow.open}
                          columns={columns}/>
                </ColumnLayout>
            </GamesWrapper>
        </ColumnLayout>
    );
}
