import {RowLayout} from 'components/ui';
import {GameDescription, GameItem} from 'components/games';
import {NavButtons} from './nav-buttons/NavButtons';
import {ActionButtons} from './action-buttons/ActionButtons';
import {If} from 'helpers';
import {isMobile} from 'app/device';
import * as View from '../View.style';
import * as S from './DescriptionView.style';
import {SpatialNavSection} from 'context';
import {useSwipeable} from 'react-swipeable';

export function DescriptionView({game, onClose, onNext, onPrev, index, indexMax, onUnFavorite})
{

    const handlers = useSwipeable({onSwipedRight: () => onPrev(), onSwipedLeft: () => onNext()});


    return (
        <SpatialNavSection focusOnMount enterTo="default-element"  {...handlers}>
            <RowLayout fullSize>
                <View.LeftPan>
                    <GameItem game={game} key={`cover-${index}`}
                              src={game.assets.cover}/>
                    <If condition={isMobile}>
                        <ActionButtons game={game} onUnFavorite={onUnFavorite} key={game.index}/>
                    </If>
                </View.LeftPan>

                <View.RightPan>
                    <S.Content>
                        <GameDescription game={game}/>
                        <If condition={!isMobile}>
                            <ActionButtons game={game} onUnFavorite={onUnFavorite} key={game.index}/>
                        </If>
                    </S.Content>
                    <NavButtons onNext={onNext}
                                onPrev={onPrev}
                                onClose={onClose}
                                index={index}
                                indexMax={indexMax}
                    />
                </View.RightPan>
            </RowLayout>
        </SpatialNavSection>
    );
}
