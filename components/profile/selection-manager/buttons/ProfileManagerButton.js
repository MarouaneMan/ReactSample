import {NavButton} from 'components/profile';
import {IconSettingsHands} from 'components/ui';
import Routes from 'app/routes';
import {initPassCheck} from 'slices';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

export function ProfileManagerButton()
{
    const history  = useHistory();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(initPassCheck({
            from: Routes.PROFILE_SELECTION,
            to  : Routes.PROFILE_MANAGER
        }));

        history.push(Routes.PASSWORD_CHECK);
    };

    return (
        <NavButton onClick={onClick}>
            <IconSettingsHands/>
        </NavButton>
    );
}
