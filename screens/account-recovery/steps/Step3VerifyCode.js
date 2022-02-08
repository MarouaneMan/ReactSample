import {BlurBox, Input, Logo,} from 'components/ui';
import {ErrorWrapper, RecoveryBoxWrapper, TitleWrapper} from 'components/account-recovery';
import {SharedElement} from 'components';
import {useTranslation} from 'react-i18next';
import * as S from 'components/account-recovery/RecoveryStep.style';
import {ActionButtons} from 'components/account-recovery/action-buttons';
import {useVerifyCode} from 'hooks/recovery';

export function StepVerifyCode()
{
    const {t}                                            = useTranslation();
    const {onSubmit, register, onInputCodeChange, error} = useVerifyCode();

    return (
        <SharedElement id="recovery-box">
            <BlurBox>
                <RecoveryBoxWrapper>
                    <SharedElement id="recovery-logo" zIndex={2} scale>
                        <Logo/>
                    </SharedElement>
                    <TitleWrapper error={error} title={t('recovery.step_verify_code')}/>
                    <S.ContentWrapper>
                        <ErrorWrapper error={error}/>
                        <S.InputsWrapper>
                            <Input focusOnMount
                                   name="code" ref={register({required: true})}
                                   placeholder={t('recovery.code_placeholder')}
                                   onChange={(e) => onInputCodeChange(e.target.value)}
                            />
                        </S.InputsWrapper>
                    </S.ContentWrapper>
                    <ActionButtons onSubmit={onSubmit}/>
                </RecoveryBoxWrapper>
            </BlurBox>
        </SharedElement>
    );
}
