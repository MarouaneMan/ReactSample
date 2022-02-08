import React from 'react';
import {RowLayout} from 'components/ui';
import {MultiView, View} from 'context/multi-view';
import {DescriptionView} from './views/description/DescriptionView';
import {MoreView} from './views/more/MoreView';
import {GameItem} from 'components/games';
import {useScrollAreaContext} from 'context';
import * as S from './GameWindowMinimized.style';

export const GameWindowMinimized = React.forwardRef(({game, ...props}, forwardRef) => {

    const scrollAreaCtx = useScrollAreaContext();

    return (
        <S.Wrapper ref={forwardRef} onFocus={scrollAreaCtx && scrollAreaCtx.resetScroll}>
            <S.Window>
                <RowLayout fullSize>
                    <S.Cover>
                        <GameItem game={game} src={game.assets.cover}/>
                    </S.Cover>
                    <MultiView defaultView="description">
                        <View name="description" component={DescriptionView} {...props} game={game}/>
                        <View name="more-view" component={MoreView} {...props} game={game}/>
                    </MultiView>
                </RowLayout>
            </S.Window>
        </S.Wrapper>
    );
});
