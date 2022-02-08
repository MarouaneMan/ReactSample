import {useEffect, useState} from 'react';
import {recoverySelector} from 'slices';
import {doAskCode} from 'slices/recovery';
import i18n from 'i18n';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {useMultiStepContext} from 'context/multi-step';

export function useAskCode()
{
    const [radioButtonStatus, setRadioButtonStatus]      = useState('');
    const [formError, setFormError]                      = useState('');
    const dispatch                                       = useDispatch();
    const {register, handleSubmit}                       = useForm();
    const {step2Done, username, error, availableMethods} = useSelector(recoverySelector);
    const {setStep}                                      = useMultiStepContext();

    useEffect(() => {
        if (step2Done)
        {
            setStep('step3');
        }
    }, [step2Done]);

    // Handle on submit
    const onSubmit = handleSubmit(() => {

        if (radioButtonStatus === '')
        {
            setFormError('recovery.step_ask_code_error');
            return;
        }

        dispatch(
            doAskCode({
                username: username,
                method  : radioButtonStatus,
                language: i18n.language,
            })
        );
    });

    return {
        onSubmit, register, availableMethods, radioButtonStatus, setRadioButtonStatus, formError, setFormError, error
    };
}
