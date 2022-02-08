import * as S from './Column.style';
import {GameItem} from 'components/games';
import {Scrollable} from 'components/scroll-area';

export function Column({games, onItemClicked, colIndex, isGapOpen, lastFocused, isFarRight, sliceCount, disableAnimation})
{
    return (
        <S.Column>
            {[...games].splice(0, sliceCount).map((game, index) =>
                <Scrollable key={`scroll-${index + colIndex}`} isGapOpen={isGapOpen} lastFocused={lastFocused}>
                    <GameItem
                        isGrid={true}
                        key={index + colIndex}
                        odd={(index + colIndex) % 2}
                        src={(index + colIndex) % 2 ? game.assets.thumb : game.assets.thumb_vertical}
                        colIndex={colIndex}
                        itemIndex={index}
                        onClick={() => onItemClicked(game.index)}
                        game={game}
                        animatable={true}
                        disableMoveRight={isFarRight}
                        disableAnimation={disableAnimation}
                    />
                </Scrollable>
            )}
        </S.Column>
    );
}
