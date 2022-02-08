import {BlurBox, LoadingButton, LogoMedium, NeutralButton, PrimaryButton, RowLayout} from 'components/ui';
import {Buttons, Error, Heading, Indication, PinCodeWrapper, Wrapper} from 'components/checker';
import {SharedElement} from 'components';
import {useTranslation} from 'react-i18next';
import {usePinCodeChecker} from 'hooks';
import {PinCode} from 'components/ui';
import {If} from 'helpers';
import {SpatialNavSection} from 'context';

export function PinCodeCheckScreen()
{
    const {t}                                                          = useTranslation();
    const {onSubmit, onCancel, invalidPinCode, isChecking, pinCodeRef} = usePinCodeChecker();

    return (
        <RowLayout alignItems="center" justifyContent="center" fullSize>
            <BlurBox>
                <Wrapper>
                    <SharedElement id="logo" zIndex={2} scale>
                        <LogoMedium/>
                    </SharedElement>
                    <Heading style={!invalidPinCode || {opacity: '0.2', marginBottom: '1rem'}}>
                        {t('profile.ask_pin_code')}
                    </Heading>
                    <If condition={invalidPinCode}>
                        <Error>{t('profile.bad_pin_code')}</Error>
                    </If>
                    <PinCodeWrapper key="PinCodeWrapper">
                        <PinCode ref={ref => !pinCodeRef.current && (pinCodeRef.current = ref)} focusOnMount
                                 enabled={true} style={{width: '100%', height: '100%'}} onSubmit={onSubmit}/>
                    </PinCodeWrapper>
                    <Indication>{t('profile.pin_code_numbers_only')}</Indication>
                    <SpatialNavSection enterTo="default-element">
                        <Buttons>
                            <LoadingButton defaultElement isLoading={isChecking} button={PrimaryButton}
                                           loadingText={t('login.checking')}
                                           onClick={onSubmit}>{t('buttons.ok')}</LoadingButton>
                            <NeutralButton onClick={onCancel}>{t('buttons.cancel')}</NeutralButton>
                        </Buttons>
                    </SpatialNavSection>
                </Wrapper>
            </BlurBox>
        </RowLayout>
    );
}
