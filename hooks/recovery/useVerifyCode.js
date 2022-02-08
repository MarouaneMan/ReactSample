import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useMultiStepContext} from 'context/multi-step';
import {recoverySelector, updateCode} from 'slices';
import {useForm} from 'react-hook-form';
import {doVerifyCode} from 'slices/recovery';


export function useVerifyCode()
{
    const dispatch                           = useDispatch();
    const {setStep}                          = useMultiStepContext();
    const {step3Done, code, username, error} = useSelector(recoverySelector);
    const {register, handleSubmit}           = useForm();

    useEffect(() => {
        if (step3Done)
        {
            setStep('step4');
        }
    }, [step3Done]);

    // On input change update code in store
    const onInputCodeChange = (val) => {
        dispatch(updateCode(val));
    };

    // Handle on submit
    const onSubmit = handleSubmit(() => {
        dispatch(
            doVerifyCode({
                username: username,
                code    : code,
            })
        );
    });

    return {onSubmit, register, onInputCodeChange, error};
}
