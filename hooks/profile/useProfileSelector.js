import {useHistory} from 'react-router-dom';
import Routes from 'app/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
    initPinCodeCheck,
    profileSelector,
    setCurrentProfile,
    setGlobalNavCategories,
    setPinCode
} from 'slices';
import {Authentication, FrontEndHelper, Games} from 'services';

import {useStartNavigation} from 'hooks';

export function useProfileSelector()
{
    const history         = useHistory();
    const dispatch        = useDispatch();
    const {profiles}      = useSelector(profileSelector);
    const username        = Authentication.GetUsername();
    const startNavigation = useStartNavigation();

    const onProfileSelected = (profile) => {

        // Set selected profile
        dispatch(setCurrentProfile(profile));

        // Set Games Minimum age filter
        Games.Filter(FrontEndHelper.GetMinimumAge(profile.contentRating.alias));

        // Set GlobalNav Categories
        dispatch(setGlobalNavCategories(Games.GetCategories().map(c => c.name)));

        if (profile.locked)
        {
            dispatch(initPinCodeCheck({
                profileUID: profile.uid,
            }));
            history.push(Routes.PIN_CODE_CHECK);
        }
        else
        {
            // clear code potentially stored from a previous profile use
            dispatch(setPinCode(''));
            startNavigation(profile.uid);
        }
    };

    return {username, profiles, onProfileSelected};
}
