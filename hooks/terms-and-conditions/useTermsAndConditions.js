import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {doLogout, signTC, termsAndConditionsSelector} from 'slices';
import {TermsAndConditions} from 'services';
import Routes from 'app/routes';
import {useBackPress} from 'hooks/input-dispatch';

export function useTermsAndConditions()
{
    const {termsAccepted}  = useSelector(termsAndConditionsSelector);
    const dispatch         = useDispatch();
    const history          = useHistory();
    const {title, content} = TermsAndConditions.GetTC();

    useEffect(() => {

        // Route to profile selection
        if (termsAccepted)
            history.push(Routes.PROFILE_SELECTION);

    }, [termsAccepted]);

    const accept = () => {
        dispatch(signTC());
    };

    const decline = () => {
        dispatch(doLogout()).then(() => {
            // Route to login
            history.push(Routes.LOGIN);
        })
    };

    useBackPress(decline);

    return {title, content, accept, decline};
}
