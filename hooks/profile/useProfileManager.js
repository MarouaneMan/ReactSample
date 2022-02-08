import {useHistory} from 'react-router-dom';
import Routes from 'app/routes';
import {useDispatch, useSelector} from 'react-redux';
import {initCreateProfileMode, initUpdateProfileMode, profileSelector, resetPassCheck} from 'slices';
import {useBackPress} from 'hooks';

export function useProfileManager()
{
    const history    = useHistory();
    const dispatch   = useDispatch();
    const {profiles} = useSelector(profileSelector);

    const onProfileSelected = (profile) => {
        dispatch(initUpdateProfileMode(profile));
        history.push(Routes.PROFILE_EDITOR);
    };

    const onAddProfile = () => {
        dispatch(initCreateProfileMode())
        history.push(Routes.PROFILE_EDITOR);
    };

    const onBack = () => {
        // reset Password Check Slice
        dispatch(resetPassCheck());

        // Route to profile section
        history.push(Routes.PROFILE_SELECTION);
    };
    useBackPress(onBack);

    return {profiles, onProfileSelected, onAddProfile, onBack};
}
