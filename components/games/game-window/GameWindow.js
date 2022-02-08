import * as S from './GameWindow.style';
import {MultiView, View} from 'context/multi-view';
import {DescriptionView} from './views/description/DescriptionView';
import {QuickMatchView} from './views/quickmatch/QuickMatchView';
import {MoreView} from './views/more/MoreView';
import React from 'react';

export const GameWindow = React.forwardRef(({defaultView, ...props}, forwardRef) => {
    return (
        <S.Wrapper >
            <S.Window ref={forwardRef}>
                <MultiView defaultView={defaultView.current.length ? defaultView.current : 'description'}>
                    <View name="description" component={DescriptionView} {...props}/>
                    <View name="quick-match" component={QuickMatchView} {...props}/>
                    <View name="more-view" component={MoreView} {...props}/>
                </MultiView>
            </S.Window>
        </S.Wrapper>
    );
});
