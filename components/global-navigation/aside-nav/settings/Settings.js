import {IconPower, IconSettings, NeutralButton, PrimaryButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import * as S from './Settings.style';
import {useAsideSettings} from 'hooks';
import {isTV} from 'app/device';
import {If} from 'helpers';

export function Settings({settingsButtonRef, onLogout, onQuit, onShowSupport})
{
    const {t} = useTranslation();
    const {
              wrapperRef, onBlur, onChangeProfile,
          }   = useAsideSettings(settingsButtonRef);

    return (
        <S.Wrapper onBlur={onBlur} ref={wrapperRef}>
            <S.SettingsWrapper>
                <S.SettingsIcon>
                    <IconSettings/>
                </S.SettingsIcon>
                <S.SettingsText>
                    {t('settings.settings')}
                </S.SettingsText>
            </S.SettingsWrapper>

            <S.Buttons>
                <PrimaryButton onClick={onChangeProfile}>
                    {t('settings.change_profile')}
                </PrimaryButton>
                <NeutralButton onClick={onShowSupport}>
                    {t('settings.support')}
                </NeutralButton>
                <NeutralButton onClick={onLogout}>
                    {t('settings.disconnect')}
                </NeutralButton>
            </S.Buttons>

            <If condition={isTV}>
                <S.QuitWrapper onClick={onQuit}>
                    <S.QuitIcon>
                        <IconPower/>
                    </S.QuitIcon>
                    <S.QuitText>{t('settings.quit')}</S.QuitText>
                </S.QuitWrapper>
            </If>

        </S.Wrapper>
    );
}
