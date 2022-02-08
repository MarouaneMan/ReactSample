import React, {useRef} from 'react';
import * as S from './GameItem.style';
import {IconHeart, Tags} from 'components/ui';
import {useGameItem} from 'hooks';
import {assetURL, If} from 'helpers';

export const GameItem = React.forwardRef(({isGrid, game, src, ...props}, ref) => {

    const {isFavorite, onToggleFavorite} = useGameItem(game);
    const favIconRef                     = useRef();

    const GameComponent = isGrid ? S.GameGridItem : S.GameItem;
    const FavoriteIcon  = isGrid ? S.FavoriteGridItem : S.FavoriteIcon;

    const animateAndToggle = e => {
        const target = favIconRef.current;
        target.classList.add('animate');
        target.onanimationend = () => {
            target.classList.remove('animate');
        };

        onToggleFavorite(e);
    };

    return (
        <GameComponent ref={ref} {...props} srcImage={src ? assetURL(src) : ''}>

            <FavoriteIcon key={`favicon-${game.alias}`} ref={favIconRef} checked={isFavorite} onClick={animateAndToggle}>
                <IconHeart/>
            </FavoriteIcon>

            <If condition={game.release_status === 'new' || game.has4k}>
                <S.TagsWrapper>
                    <Tags isNew={game.release_status === 'new'} is4K={game.has4k}/>
                </S.TagsWrapper>
            </If>

            <If condition={!src}>
                <S.GameItemTextFallback>
                    {game.name}
                </S.GameItemTextFallback>
            </If>

        </GameComponent>
    );
});
