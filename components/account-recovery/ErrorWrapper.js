import {useEffect, useState} from 'react';
import {If} from 'helpers';
import * as S from './RecoveryStep.style';
import {useTranslation} from 'react-i18next';

export function ErrorWrapper({error})
{
    const [theError, setTheError] = useState();
    const {t}                     = useTranslation();

    useEffect(() => {
        if(error) {
            if (error.password_repeat)
            {
                setTheError(error.password_repeat.message);
            }
            else if(Object.keys(error).length === 0 && error.constructor === Object) {
                setTheError(null);
            }
            else
            {
                setTheError(error);
            }
        }
    }, [error]);

    return (
        <If condition={theError}>
            <S.ErrorWrapper>{t(theError)}</S.ErrorWrapper>
        </If>
    );
}
