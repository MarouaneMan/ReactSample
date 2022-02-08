import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {globalNavigationSelector, setCurrentSubTab, setCurrentTab} from 'slices';
import history from 'app/history';
import {useThemeContext} from 'context';

export function useGlobalNavigation()
{
    const {navigation, currentTab, visible, subMenuVisible} = useSelector(globalNavigationSelector);
    const dispatch                                          = useDispatch();
    const theme                                             = useThemeContext();

    useEffect(() => {
        if (visible)
        {
            theme.startWallpaperLoop();
        }
        else
        {
            theme.setMainWallpaper();
        }
    }, [visible]);

    const onTabSelected = (tab) => {
        // Route to target tab
        history.push(tab);

        dispatch(setCurrentTab(tab));
    };

    const onSubTabSelected = (item) => {
        dispatch(setCurrentSubTab(item));
    };

    return {navigation, currentTab, visible, subMenuVisible, onTabSelected, onSubTabSelected};
}
