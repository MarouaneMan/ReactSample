import React, {useRef} from 'react';
import {Checkbox} from 'components/ui';
import {useTranslation} from 'react-i18next';
import * as S from './RememberMe.style';

export const RememberMe = React.forwardRef((props, forwardedRef) => {
    const {t} = useTranslation();
    const ref = useRef(null);

    return (
        <S.Wrapper ref={ref} onClick={e => {
            if (e.target === e.currentTarget)
                e.currentTarget.firstChild.click();
        }}>
            <Checkbox {...props} ref={forwardedRef} onClick={() => ref.current.focus()}/>
            <S.Text onClick={e => e.target.previousSibling.click()}>
                {t('login.remember_me')}
            </S.Text>
        </S.Wrapper>
    );
});

