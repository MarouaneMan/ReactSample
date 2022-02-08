import {useTranslation} from 'react-i18next';
import {BlurBox, Input, Logo,} from 'components/ui';
import {ActionButtons, RecoveryBoxWrapper, ErrorWrapper, TitleWrapper} from 'components/account-recovery';
import {SharedElement} from 'components';
import * as S from 'components/account-recovery/RecoveryStep.style';
import {useGetMethod} from 'hooks/recovery';

export function StepGetMethod()
{
    const {t}                                             = useTranslation();
    const {onInputLoginChange, onSubmit, register, error} = useGetMethod();

    return (
        <SharedElement id="recovery-box">
            <BlurBox>
                <RecoveryBoxWrapper>
                    <SharedElement id="recovery-logo" zIndex={2} scale>
                        <Logo/>
                    </SharedElement>
                    <TitleWrapper error={error} title={t('recovery.step_get_method')}/>
                    <S.ContentWrapper>
                        <ErrorWrapper error={error}/>
                        <S.InputsWrapper>
                            <Input
                                focusOnMount
                                ref={register({required: true})}
                                name="username"
                                placeholder={t('login.username')}
                                onChange={(e) => onInputLoginChange(e.target.value)}
                            />
                        </S.InputsWrapper>
                    </S.ContentWrapper>
                    <ActionButtons onSubmit={onSubmit}/>
                </RecoveryBoxWrapper>
            </BlurBox>
        </SharedElement>
    );
}
