import {useEffect} from 'react';
import {recoverySelector} from 'slices';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {useMultiStepContext} from 'context/multi-step';
import {doAskCode, doGetMethod, updateUsername} from 'slices/recovery';
import i18n from 'i18n';

export function useGetMethod()
{
    const {step1Done, username, error, availableMethods} = useSelector(recoverySelector);
    const dispatch                                       = useDispatch();
    const {register, handleSubmit}                       = useForm();
    const {setStep}                                      = useMultiStepContext();

    //check if only 1 method to set next Step
    useEffect(() => {

        if(availableMethods)
        {
            if (Object.keys(availableMethods).length === 1)
            {
                dispatch(
                    doAskCode({
                        username: username,
                        method  : Object.keys(availableMethods)[0],
                        language: i18n.language,
                    })
                );

                //Skip selection method if has only one
                setStep('step3');
            }
            else
            {
                setStep('step2');
            }
        }
    }, [step1Done]);

    // On Input Login Change
    const onInputLoginChange = (val) => {
        dispatch(updateUsername(val));
    };

    // Handle on submit
    const onSubmit = handleSubmit(() => {
        dispatch(
            doGetMethod({
                username: username
            })
        );
    });

    return {
        onSubmit, onInputLoginChange, register, error
    };
}
