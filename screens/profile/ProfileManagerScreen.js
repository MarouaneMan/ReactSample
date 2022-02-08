import {Wrapper, ProfileList, ProfileManager} from 'components/profile/selection-manager';
import {NavButton, Instruction} from 'components/profile';
import {BlurBox, IconArrowLeft, IconPlus, RowLayout} from 'components/ui';
import {SharedElement} from 'components';
import {useTranslation} from 'react-i18next';
import {useProfileManager} from 'hooks';

export function ProfileManagerScreen()
{
    const {t}                                                 = useTranslation();
    const {profiles, onProfileSelected, onBack, onAddProfile} = useProfileManager();

    return (
        <RowLayout alignItems="center" justifyContent="center" fullSize>
            <SharedElement id="box">
                <BlurBox>
                    <Wrapper count={profiles.length}>
                        <ProfileManager/>
                        <Instruction>
                            {t('profile.manage_profile')}
                        </Instruction>
                        <RowLayout fullWidth>
                            <NavButton onClick={onBack}>
                                <IconArrowLeft/>
                            </NavButton>
                            <ProfileList list={profiles} onSelected={onProfileSelected}/>
                            <NavButton onClick={onAddProfile}>
                                <IconPlus/>
                            </NavButton>
                        </RowLayout>
                    </Wrapper>
                </BlurBox>
            </SharedElement>
        </RowLayout>
    );
}
