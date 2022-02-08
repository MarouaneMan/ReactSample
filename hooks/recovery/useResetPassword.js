import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {doResetPassword, recoverySelector, resetSteps} from 'slices/recovery';
import {showGlobalMessageBox} from 'slices';
import {useForm} from 'react-hook-form';
import Routes from 'app/routes';

export function useResetPassword()
{
    const dispatch                                = useDispatch();
    const {t}                                     = useTranslation();
    const {step4Done, username, code}             = useSelector(recoverySelector);
    const {register, handleSubmit, watch, errors} = useForm();
    const passwordRef                             = useRef({});
    passwordRef.current                           = watch('password', '');

    useEffect(() => {
        if (step4Done)
        {
            dispatch(resetSteps());
            dispatch(
                showGlobalMessageBox({
                    type : 'success',
                    message: t('recovery.password_changed'),
                    routeTo : Routes.LOGIN,
                })
            );
        }
    }, [step4Done]);

    // Handle on submit
    const onSubmit = handleSubmit((data) => {
        dispatch(
            doResetPassword({
                username    : username,
                code        : code,
                new_password: data.password
            })
        );
    });

    return {onSubmit, register, errors, passwordRef};
}
