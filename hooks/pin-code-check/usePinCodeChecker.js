import {useCallback, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {doPinCodeCheck, pinCodeCheckSelector, profileSelector, setPinCode} from 'slices';
import {useBackPress, useStartNavigation} from 'hooks';
import Routes from 'app/routes';

export function usePinCodeChecker()
{
    const history                                   = useHistory();
    const dispatch                                  = useDispatch();
    const {currentProfile}                          = useSelector(profileSelector);
    const {checkPassed, invalidPinCode, isChecking} = useSelector(pinCodeCheckSelector);
    const pinCodeRef                                = useRef();
    const startNavigation                           = useStartNavigation();

    useEffect(() => {
        // Pin code OK, route to games
        if (checkPassed)
        {
            const pinCode = pinCodeRef.current.value();
            // Save pin code for later use
            dispatch(setPinCode(pinCode));

            startNavigation(currentProfile.uid, pinCode);
        }
    }, [checkPassed]);

    const onCancel = () => {
        // Go back
        history.push(Routes.PROFILE_SELECTION);
    };

    // Back button
    useBackPress(onCancel);

    // onSubmit check pin code
    const onSubmit = useCallback(() => {
        if (pinCodeRef.current.validate())
        {
            // Check pin code
            dispatch(doPinCodeCheck({
                profileUID: currentProfile.uid,
                pinCode   : pinCodeRef.current.value(),
            }));
        }
    }, []);

    return {onSubmit, onCancel, invalidPinCode, isChecking, pinCodeRef};
}
