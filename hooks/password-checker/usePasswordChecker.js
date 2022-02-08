import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {doPassCheck, passwordCheckSelector, updatePassword} from 'slices';
import {useBackPress} from 'hooks';

export function usePasswordChecker()
{
    const {register, handleSubmit}         = useForm();
    const history                          = useHistory();
    const dispatch                         = useDispatch();
    const {routeFrom, routeTo}             = useSelector(passwordCheckSelector);
    const {error, checkPassed, isChecking} = useSelector(passwordCheckSelector);

    useEffect(() => {

        // Password OK, route to target
        if (checkPassed)
            history.push(routeTo);

    }, [checkPassed]);

    const onCancel = () => {
        // Go back
        history.push(routeFrom);
    };

    // Back button
    useBackPress(onCancel);

    const onPasswordChange = (e) => dispatch(updatePassword(e.target.value));

    const onSubmit = handleSubmit(data => {
        dispatch(doPassCheck(data.password));
    });

    return {register, onSubmit, onCancel, onPasswordChange, error, isChecking};
}
