import {useTranslation} from 'react-i18next';
import {ActionButtons, ErrorWrapper, RecoveryBoxWrapper, TitleWrapper} from 'components/account-recovery';
import * as S from 'components/account-recovery/RecoveryStep.style';
import {BlurBox, Logo, RadioButton,} from 'components/ui';
import {useAskCode} from 'hooks/recovery';
import {SharedElement} from 'components';

export function StepAskCode()
{
    const {t}                                                                           = useTranslation();
    const {availableMethods, onSubmit, radioButtonStatus, setRadioButtonStatus, error} = useAskCode();

    return (
        <SharedElement id="recovery-box">
            <BlurBox>
                <RecoveryBoxWrapper>
                    <SharedElement id="recovery-logo" zIndex={2} scale>
                        <Logo/>
                    </SharedElement>
                    <TitleWrapper error={error} title={t('recovery.step_ask_code')}/>
                    <S.ContentWrapper>
                        <ErrorWrapper error={error}/>
                        <S.RadioButtons>
                            <S.RadioButtonsInner>
                                {Object.keys(availableMethods).map((method, index) => {
                                        return (
                                            <S.RadioButtonWrapper key={index}>
                                                <RadioButton
                                                    focusOnMount={index === 0}
                                                    value={method}
                                                    onRadioButtonClick={setRadioButtonStatus}
                                                    label={t(`recovery.method_${method}`)}
                                                    radioButtonStatus={radioButtonStatus}/>
                                            </S.RadioButtonWrapper>
                                        );
                                    }
                                )}
                            </S.RadioButtonsInner>
                        </S.RadioButtons>
                    </S.ContentWrapper>
                    <ActionButtons onSubmit={onSubmit}/>
                </RecoveryBoxWrapper>
            </BlurBox>
        </SharedElement>
    );
}
