import * as S from './ProfileManager.style';
import {useTranslation} from 'react-i18next';
import {IconSettingsHands} from 'components/ui';

export function ProfileManager()
{
    const {t} = useTranslation();

    return (
        <S.Wrapper>
            <S.Icon>
                <IconSettingsHands/>
            </S.Icon>
            <S.Text>{t('profile.profile_manager')}</S.Text>
        </S.Wrapper>
    );
}
