import {useDispatch, useSelector} from 'react-redux';
import {doLogin, loginSelector, showGlobalMessageBox} from 'slices';
import {useForm} from 'react-hook-form';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ConfigFront} from 'services';

export function useLogin()
{
    const {t}                                   = useTranslation();
    const {register, handleSubmit}              = useForm();
    const dispatch                              = useDispatch();
    const {isChecking, hasLoginError, loggedIn} = useSelector(loginSelector);
    const supportMethods                        = ConfigFront.GetSupportMethods();
    const registerUrl                           = ConfigFront.GetRegisterUrl();
    const LoginBoxRef                           = useRef();

    useEffect(() => {

        // Show login error
        if (hasLoginError)
        {
            dispatch(showGlobalMessageBox({
                message: t('login.bad_credentials')
            }));
        }

    }, [hasLoginError]);

    const onSubmit = handleSubmit(data => {
        dispatch(doLogin({
            username  : data.username,
            password  : data.password,
            rememberMe: data.rememberMe,
        }));
    });

    return {
        register,
        onSubmit,
        isChecking,
        loggedIn,
        LoginBoxRef,
        supportMethods,
        registerUrl
    };
}
