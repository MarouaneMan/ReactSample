import {BlurBox, Input, LoadingButton, LogoMedium, NeutralButton, PrimaryButton, RowLayout} from 'components/ui';
import {SharedElement} from 'components';
import {Buttons, Error, Heading, Wrapper} from 'components/checker';
import {useTranslation} from 'react-i18next';
import {usePasswordChecker} from 'hooks';
import {ForgotPassword} from 'components/login';
import {SpatialNavSection} from 'context';
import {If} from 'helpers';

export function PasswordCheckScreen()
{
    const {t}                                                                 = useTranslation();
    const {register, onSubmit, onCancel, error, isChecking, onPasswordChange} = usePasswordChecker();

    return (
        <RowLayout alignItems="center" justifyContent="center" fullSize>
            <BlurBox>
                <Wrapper>
                    <SharedElement id="logo" zIndex={2} scale>
                        <LogoMedium/>
                    </SharedElement>
                    <Heading style={!error || {opacity: '0.2', marginBottom: '1rem'}}>
                        {t('profile.ask_password')}
                    </Heading>
                    <If condition={error}>
                        <Error>{t(error)}</Error>
                    </If>
                    <Input focusOnMount name="password" type="password" placeholder={t('login.password')}
                           ref={register({required: true})} onChange={onPasswordChange}  onKeyDown={(e) => e.keyCode === 13 ? onSubmit() : null}/>
                    <ForgotPassword/>
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
