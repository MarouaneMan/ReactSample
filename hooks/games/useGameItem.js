import {useDispatch, useSelector} from 'react-redux';
import {favoritesSelector, profileSelector, setFavorite} from 'slices';
import {useCallback, useMemo} from 'react';

export function useGameItem(game)
{
    const {favorites}      = useSelector(favoritesSelector);
    const {currentProfile} = useSelector(profileSelector);
    const isFavorite       = useMemo(() => favorites.includes(game.alias), [game, favorites]);
    const dispatch         = useDispatch();

    const onToggleFavorite = useCallback((e) => {
        e.stopPropagation();

        dispatch(setFavorite({
            profileUID: currentProfile.uid,
            game      : game,
            favorite  : !isFavorite
        }));

    }, [game, isFavorite]);

    return {isFavorite, onToggleFavorite};
}
