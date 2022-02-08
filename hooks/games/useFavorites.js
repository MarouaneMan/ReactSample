import {Games} from 'services';
import {isMobile, isTV} from 'app/device';
import {useDispatch, useSelector} from 'react-redux';
import {favoritesSelector, profileSelector, setFavorite} from 'slices';
import {useMemo} from 'react';

export function useFavorites()
{
    const {favorites}      = useSelector(favoritesSelector);
    const {currentProfile} = useSelector(profileSelector);
    const dispatch         = useDispatch();

    // Make games list
    let games = useMemo(() => {

        // Lookup table to speed up things
        let lookupTable = {};
        favorites.forEach(e => lookupTable[e] = true);

        let array = [];
        let index = 0;
        Games.GetGames().forEach((game) => {
            if (lookupTable[game.alias])
                array.push({...game, index: index++});
        });

        return array;
    }, [favorites]);

    // Init columns
    let maxCols   = isTV ? 6 : isMobile ? 4 : 5;
    const columns = [...Array(maxCols)].map(() => []);

    // Fill columns
    games.forEach((game, index) => {
        columns[index % maxCols].push(game);
    });

    // UnFav game
    const onUnFavorite = (game) => {
        dispatch(setFavorite({
            profileUID: currentProfile.uid,
            game      : game,
            favorite  : false,
        }));
    };

    return {
        games,
        columns,
        onUnFavorite
    };
}
