import {useDispatch, useSelector} from 'react-redux';
import * as PE from 'slices/profile/ProfileEditorSlice';
import {useHistory} from 'react-router-dom';
import {passwordCheckSelector, showGlobalMessageBox, addProfile, updateProfile, deleteProfile} from 'slices';
import {decrypt} from 'helpers';
import {useAvatarSelection, useFirstRef} from 'hooks';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import Routes from 'app/routes';

export function useProfileEditor()
{
    const dispatch                      = useDispatch();
    const {t}                           = useTranslation();
    const state                         = useSelector(PE.profileEditorSelector);
    const {password: encryptedPassword} = useSelector(passwordCheckSelector);
    const history                       = useHistory();
    const pinCodeRef                    = useFirstRef(useRef());
    const profileNameRef                = useFirstRef(useRef());
    const avatarSelection               = useAvatarSelection('profile-editor', state.avatar);

    const password = decrypt(encryptedPassword);

    useEffect(() => {
        // Clear Profile editor on unmount
        return () => dispatch(PE.resetProfileEditor());
    }, []);

    useEffect(() => {

        // Has error
        if (state.error)
        {
            dispatch(showGlobalMessageBox({message: t(state.error)}));
            dispatch(PE.clearProfileError());
        }

        // Profile successfully created
        if (state.profileCreated)
        {
            dispatch(showGlobalMessageBox({
                type   : 'success',
                message: t('profile.profile_created'),
                routeTo: Routes.PROFILE_MANAGER
            }));

            // Add it to profileSlice
            dispatch(addProfile({
                profileName  : state.profileName,
                uid          : state.uid,
                locked       : state.locked,
                avatar       : state.avatar,
                contentRating: state.contentRating
            }));
        }

        // Profile successfully updated
        if (state.profileUpdated)
        {
            dispatch(showGlobalMessageBox({
                type   : 'success',
                message: t('profile.profile_updated'),
                routeTo: Routes.PROFILE_MANAGER
            }));

            // update profileSlice
            dispatch(updateProfile({
                uid          : state.uid,
                locked       : state.locked,
                avatar       : state.avatar,
                profileName  : state.profileName,
                contentRating: state.contentRating
            }));
        }

        // Profile deleted
        if (state.profileDeleted)
        {
            dispatch(showGlobalMessageBox({
                type   : 'success',
                message: t('profile.profile_deleted'),
                routeTo: Routes.PROFILE_MANAGER
            }));

            // update profileSlice
            dispatch(deleteProfile(state.uid));
        }

    }, [state.error, state.profileCreated, state.profileUpdated, state.profileDeleted, state.avatar]);

    const validateCreate = () => {
        // Validate profile name
        if (state.profileName.length <= 0)
        {
            profileNameRef.ref.current.focus();
            return false;
        }

        // Validate pin code if profile is locked
        if (state.locked && !pinCodeRef.ref.current.validate())
            return false;

        return true;
    };

    const validateUpdate = () => {
        // Was not locked, and now locked but the user omitted the pin code
        if (!state.oldState.locked && state.locked && !pinCodeRef.ref.current.validate())
            return false;
        // Locked but pin code incomplete
        if (state.locked && state.pinCode.length !== 0 && !pinCodeRef.ref.current.validate())
            return false;
        return true;
    };

    const callbacks = {

        // Update state
        onContentRatingChange: (e) => dispatch(PE.updateContentRating(e)),
        onPINChange          : (e) => dispatch(PE.updatePINCode(e)),
        onProfileName        : (e) => dispatch(PE.updateProfileName(e.target.value)),
        onProfileLockChange  : (e) => dispatch(PE.updateProfileLocked(e.target.checked)),
        onDeleteConfirmation : (e) => dispatch(PE.showDeleteProfileConfirmation(e)),

        // Create profile
        onCreate: () => {
            validateCreate() && dispatch(PE.doCreateProfile({
                password,
                avatar       : state.avatar,
                profileName  : state.profileName,
                contentRating: state.contentRating,
                locked       : state.locked,
                pinCode      : state.pinCode
            }));
        },

        // Update profile
        onUpdate: () => {
            validateUpdate() && dispatch(PE.doUpdateProfile({
                password,
                uid          : state.uid,
                avatar       : state.avatar,
                profileName  : state.profileName,
                contentRating: state.contentRating,
                locked       : state.locked,
                pinCode      : state.pinCode,
                oldState     : state.oldState,
            }));
        },

        // Delete profile
        onDelete: () => {
            dispatch(PE.showDeleteProfileConfirmation(false));
            dispatch(PE.doDeleteProfile({
                password,
                uid: state.uid
            }));
        },

        onCancel: () => {
            history.push(Routes.PROFILE_MANAGER);
        }
    };

    return {state, callbacks, pinCodeRef, profileNameRef, avatarSelection};
}
