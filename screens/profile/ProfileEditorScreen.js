import {BlurBox, ConfirmationBox, RowLayout} from 'components/ui';
import * as P from 'components/profile/editor';
import {useTranslation} from 'react-i18next';
import {SharedElement} from 'components';
import {useProfileEditor} from 'hooks';
import {If} from 'helpers';

export function ProfileEditorScreen()
{
    const {t}                                                             = useTranslation();
    const {state, callbacks, profileNameRef, pinCodeRef, avatarSelection} = useProfileEditor();

    return (
        <>
            <If condition={state.deleteConfirmation}>
                <ConfirmationBox message={t('profile.delete_confirmation')}
                                 accept={t('buttons.delete')} decline={t('buttons.cancel')}
                                 onAccept={callbacks.onDelete}
                                 onDecline={() => callbacks.onDeleteConfirmation(false)}/>
            </If>
            <RowLayout alignItems="center" justifyContent="center" fullSize>
                <SharedElement id="profile-editor" key={avatarSelection.key}>
                    <BlurBox>
                        <If condition={avatarSelection.visible}>
                            <P.AvatarSelection avatars={avatarSelection.avatars} onCancel={avatarSelection.cancel}
                                               onSelected={avatarSelection.onSelected}/>
                        </If>
                        <If condition={!avatarSelection.visible}>
                            <P.Wrapper>
                                <P.Heading>{state.mode === 'create' ? t('profile.profile_creation') : t('profile.profile_edition')}</P.Heading>
                                <P.Content>
                                    <P.LeftPan>
                                        <P.ProfileAvatar onClick={() => {
                                            pinCodeRef.clear();
                                            profileNameRef.clear();
                                            avatarSelection.show();
                                        }} avatar={state.avatar}/>
                                        <P.ProfileNameInput ref={profileNameRef.firstRef} name="profile_name"
                                                            value={state.profileName}
                                                            placeholder={t('profile.profile_name')}
                                                            onChange={callbacks.onProfileName}
                                        />
                                    </P.LeftPan>
                                    <P.RightPan>
                                        <P.ContentRating defaultValue={state.contentRating}
                                                         onChange={callbacks.onContentRatingChange}/>
                                        <P.ProfileLock ref={pinCodeRef.firstRef}
                                                       onLockChange={callbacks.onProfileLockChange}
                                                       locked={state.locked}
                                                       onPinChange={callbacks.onPINChange} defaultPIN={state.pinCode}/>
                                    </P.RightPan>
                                </P.Content>

                                {state.mode === 'create' && <P.CreateButtons state={state} callbacks={callbacks}/>}
                                {state.mode === 'update' && <P.UpdateButtons state={state} callbacks={callbacks}/>}

                            </P.Wrapper>
                        </If>
                    </BlurBox>
                </SharedElement>
            </RowLayout>
        </>
    );
}
