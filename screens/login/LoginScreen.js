import {
    ForgotPassword,
    LangSelection,
    LoginBoxWrapper,
    LoginButton,
    LoginInputsWrapper,
    RememberMe,
    WelcomeText,
    BottomButtons
} from 'components/login';
import {BlurBox, ColumnLayout, Input, LangIcon, Logo, RowLayout} from 'components/ui';
import {usePreLoader} from 'hooks';
import {useLanguageSelect, useLogin} from 'hooks/login';
import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {SharedElement} from 'components';
import {SpatialNavSection} from 'context';
import {If} from 'helpers';
import Routes from 'app/routes';
import {isMobile} from '../../app/device';

export function LoginScreen()
{
    const {t}                                       = useTranslation();
    const {lang, langSelectVisible, showLangSelect} = useLanguageSelect();
    const login                                     = useLogin();
    const isLoading                                 = usePreLoader();

    if (login.loggedIn)
        return <Redirect to={Routes.MEGA_LOADER}/>;

    if (isLoading)
        return <div/>;

    return (
        <>
            <RowLayout alignItems="center" justifyContent="center" fullSize ref={login.LoginBoxRef}>
                <SharedElement id="box" freeze>
                    <BlurBox>
                        <LoginBoxWrapper>
                            <SharedElement id="logo" zIndex={2} scale>
                                <Logo/>
                            </SharedElement>
                            <WelcomeText/>
                            <LoginInputsWrapper>
                                <If condition={langSelectVisible}>
                                    <LangSelection/>
                                </If>
                                <If condition={!langSelectVisible}>
                                    <LangIcon focusOnMount lang={lang} onClick={showLangSelect}/>
                                    <Input defaultValue={process.env.NODE_ENV === 'development' ? 'xavier' : ''} name="username"
                                           placeholder={t('login.username')}
                                           ref={login.register({required: true})} tabIndex={1}
                                           autoCorrect="off"
                                           autoCapitalize="none"/>
                                    <Input defaultValue={process.env.NODE_ENV === 'development' ? 'xavier' : ''} name="password"
                                           type="password" placeholder={t('login.password')}
                                           ref={login.register({required: true})} tabIndex={2}
                                           onKeyDown={(e) => e.keyCode === 13 ? login.onSubmit() : null}/>
                                </If>
                            </LoginInputsWrapper>
                            <SpatialNavSection enterTo="default-element">
                                <ColumnLayout justifyContent="center" alignItems="center" fullWidth
                                              style={!langSelectVisible || {
                                                  opacity: '0.35', filter: 'saturate(0)', pointerEvents: 'none'
                                              }}>
                                    <RowLayout justifyContent="space-between" fullWidth>
                                        <RememberMe name="rememberMe" ref={login.register} defaultChecked/>
                                        <ForgotPassword/>
                                    </RowLayout>
                                    <LoginButton defaultElement isChecking={login.isChecking} onClick={login.onSubmit}/>
                                </ColumnLayout>
                            </SpatialNavSection>
                            <If condition={isMobile}>
                                <BottomButtons wrapperToHide={login.LoginBoxRef} supportMethods={login.supportMethods}
                                               registerUrl={login.registerUrl}/>
                            </If>
                        </LoginBoxWrapper>
                    </BlurBox>
                </SharedElement>
            </RowLayout>
            <If condition={!isMobile}>
                <BottomButtons wrapperToHide={login.LoginBoxRef}
                               supportMethods={login.supportMethods}
                               registerUrl={login.registerUrl}/>
            </If>
        </>
    );
}

