import {ConfirmationBox, IconHeart, IconSettingsGlobal} from 'components/ui';
import {SpatialNavSection} from 'context';
import {Settings} from './settings/Settings';
import * as S from './AsideNav.style';
import {If} from 'helpers';
import ReactDOM from 'react-dom';
import {useTranslation} from 'react-i18next';
import {useAsideNav, useFavorites} from 'hooks';
import {SupportMessageBox} from 'components/support-message-box/SupportMessageBox';

export function AsideNav()
{
    const {t}      = useTranslation();
    const asideNav = useAsideNav();
    const {games}  = useFavorites();

    return (
        <>
            <If condition={asideNav.logout.visible}>
                {ReactDOM.createPortal(
                    <ConfirmationBox
                        message={t('login.logout_confirmation')}
                        onAccept={asideNav.doLogout}
                        onDecline={() => {
                            asideNav.logout.callbacks.declineLogout();
                            asideNav.settingsButtonRef.current.focus();
                        }}/>
                    , document.body)}
            </If>

            <If condition={asideNav.quit.visible}>
                {ReactDOM.createPortal(
                    <ConfirmationBox
                        message={t('settings.quit_confirmation')}
                        onAccept={asideNav.quit.callbacks.doQuit}
                        onDecline={() => {
                            asideNav.quit.callbacks.decline();
                            asideNav.settingsButtonRef.current.focus();
                        }}/>
                    , document.body)}
            </If>

            <If condition={asideNav.support.visible}>
                <SupportMessageBox
                    onClose={asideNav.support.hideSupport}
                    supportMethods={asideNav.support.supportMethods}/>
            </If>

            <SpatialNavSection>
                <S.Wrapper favoritesVisible={asideNav.favoritesVisible}
                           settingsVisible={asideNav.settingsVisible}
                           settingsState={asideNav.settingsHover}>
                    <S.FavoriteIcon key={`favorites${games.length}`}
                                    checked={games.length > 0}
                                    onFocus={asideNav.onFavoritesFocus}
                                    onBlur={asideNav.onFavoritesBlur}>
                        <IconHeart/>
                    </S.FavoriteIcon>
                    <S.SettingsIcon ref={asideNav.settingsButtonRef}
                                    onClick={asideNav.onSettingsClick}
                                    onFocus={asideNav.onSettingsFocus}
                                    onMouseEnter={asideNav.toggleSettingsState}
                                    onMouseLeave={asideNav.toggleSettingsState}
                    >
                        <IconSettingsGlobal/>
                    </S.SettingsIcon>
                </S.Wrapper>
            </SpatialNavSection>
            <If condition={asideNav.settingsVisible}>
                <Settings settingsButtonRef={asideNav.settingsButtonRef}
                          onLogout={asideNav.logout.callbacks.showLogoutBox}
                          onQuit={asideNav.quit.callbacks.show}
                          onShowSupport={asideNav.support.showSupport}
                />
            </If>
        </>
    );
}
