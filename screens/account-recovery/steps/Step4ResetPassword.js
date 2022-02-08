import {BlurBox, Input, Logo,} from 'components/ui';
import {ActionButtons, ErrorWrapper, RecoveryBoxWrapper, TitleWrapper} from 'components/account-recovery';
import {SharedElement} from 'components';
import {useTranslation} from 'react-i18next';
import * as S from 'components/account-recovery/RecoveryStep.style';
import {useResetPassword} from 'hooks/recovery';

export function StepResetPassword()
{
    const {t}                                       = useTranslation();
    const {onSubmit, register, errors, passwordRef} = useResetPassword();

    return (
        <SharedElement id="recovery-box">
            <BlurBox>
                <RecoveryBoxWrapper>
                    <SharedElement id="recovery-logo" zIndex={2} scale>
                        <Logo/>
                    </SharedElement>
                    <TitleWrapper error={errors} title={t('recovery.step_reset_password')}/>
                    <S.ContentWrapper>
                        <ErrorWrapper error={errors}/>
                        <S.InputsWrapper>
                            <Input focusOnMount
                                   name="password"
                                   type="password"
                                   ref={register({required: true})}
                                   placeholder={t('recovery.password_placeholder')}/>
                            <S.InputPasswordConfirm name="password_repeat"
                                                    type="password"
                                                    placeholder={t('recovery.password_confirmation_placeholder')}
                                                    ref={register({
                                                        validate: value =>
                                                            value === passwordRef.current || 'recovery.step_password_reset_match_error'
                                                    })}/>
                        </S.InputsWrapper>
                    </S.ContentWrapper>
                    <ActionButtons onSubmit={onSubmit}/>
                </RecoveryBoxWrapper>
            </BlurBox>
        </SharedElement>
    );
}
