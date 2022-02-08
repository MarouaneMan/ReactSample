import {useState} from 'react';
import Routes from 'app/routes';
import {useDispatch} from 'react-redux';
import {doLogout} from 'slices';
import history from 'app/history';

export function useLogout()
{
    const [visible, setVisible] = useState(false);
    const dispatch              = useDispatch();

    const callbacks = {

        doLogout: (callback) => {
            dispatch(doLogout()).then(() => {
                history.push(Routes.LOGIN);
                if (typeof callback === 'function')
                    callback();
            });
        },

        declineLogout: () => {
            setVisible(false);
        },

        showLogoutBox: () => {
            setVisible(true);
        }
    };

    return {visible, callbacks};
}
