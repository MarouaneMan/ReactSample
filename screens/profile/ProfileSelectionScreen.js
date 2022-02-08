import {SharedElement} from 'components';
import {RowLayout, BlurBox, LogoMedium, ConfirmationBox} from 'components/ui';
import {LogoutButton, Wrapper, ProfileList, ProfileManagerButton, WelcomeMessage} from 'components/profile/selection-manager';
import {useTranslation} from 'react-i18next';
import {useBackPress, useLogout, useProfileSelector} from 'hooks';
import {If} from 'helpers';

export function ProfileSelectionScreen()
{
    const {t}                                     = useTranslation();
    const {username, profiles, onProfileSelected} = useProfileSelector();
    const logout                                  = useLogout();

    useBackPress(logout.callbacks.showLogoutBox);

    return (
        <>
            <If condition={logout.visible}>
                <ConfirmationBox
                    message={t('login.logout_confirmation')}
                    onAccept={logout.callbacks.doLogout}
                    onDecline={logout.callbacks.declineLogout}/>
            </If>
            <RowLayout alignItems="center" justifyContent="center" fullSize>
                <SharedElement id="box">
                    <BlurBox>
                        <Wrapper count={profiles.length}>
                            <SharedElement id="logo" zIndex={2} scale>
                                <LogoMedium/>
                            </SharedElement>
                            <WelcomeMessage>
                                {t('profile.welcome_message', {username: username})}
                            </WelcomeMessage>
                            <RowLayout fullWidth>
                                <LogoutButton onClick={logout.callbacks.showLogoutBox}/>
                                <ProfileList list={profiles} onSelected={onProfileSelected}/>
                                <ProfileManagerButton/>
                            </RowLayout>
                        </Wrapper>
                    </BlurBox>
                </SharedElement>
            </RowLayout>
        </>
    );
}
