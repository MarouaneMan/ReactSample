import {useDispatch, useSelector} from 'react-redux';
import {globalNavigationSelector, resetGlobalNavigation, setFavoritesVisible, setSettingsVisible, toggleSettings} from '../../slices';
import {useRef, useState} from 'react';
import {useLogout, useQuit, useSupportMessageBox} from 'hooks';
import history from 'app/history';
import Routes from 'app/routes';

export function useAsideNav()
{
    const {favoritesVisible, settingsVisible} = useSelector(globalNavigationSelector);
    const dispatch                            = useDispatch();
    const settingsButtonRef                   = useRef();
    const settingsFirstFocus                  = useRef(true);
    const logout                              = useLogout();
    const quit                                = useQuit();
    const support                             = useSupportMessageBox();
    const [settingsHover, setSettingsHover]   = useState(false);

    const toggleSettingsState = () => {
        setSettingsHover(!settingsHover);
    };

    const onFavoritesFocus = () => {

        // Route to Favorites
        history.push(Routes.GAMES.FAVORITES);

        dispatch(setFavoritesVisible(true));
        dispatch(setSettingsVisible(false));
    };

    const onFavoritesBlur = () => {
        dispatch(setFavoritesVisible(false));
    };

    const onSettingsClick = () => {
        if (!settingsFirstFocus.current)
            dispatch(toggleSettings());
        settingsFirstFocus.current = false;
    };

    const onSettingsFocus = () => {
        settingsFirstFocus.current = true;
        dispatch(setSettingsVisible(true));
    };

    const doLogout = () => {
        logout.callbacks.doLogout(() => {
            dispatch(resetGlobalNavigation());
        });
    };

    return {
        favoritesVisible,
        settingsVisible,
        onFavoritesFocus,
        onFavoritesBlur,
        onSettingsClick,
        onSettingsFocus,
        settingsButtonRef,
        logout,
        quit,
        support,
        doLogout,
        toggleSettingsState,
        settingsHover
    };
}
