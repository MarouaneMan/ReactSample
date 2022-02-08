import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {getFavorites, toggleGlobalNavigation} from 'slices';
import {Games} from 'services';
import {useHistory} from 'react-router-dom';
import Routes from 'app/routes';


export function useStartNavigation()
{
    const dispatch = useDispatch();
    const history  = useHistory();

    return useCallback((profileUID, pinCode) => {
        // Init Favorites Slice
        dispatch(getFavorites({profileUID, pinCode}));
        // load stats
        Games.SetStats(profileUID);

        // Route to games
        dispatch(toggleGlobalNavigation());
        history.push(Routes.GAMES.HIGHLIGHTS);
    }, []);
}
