import {useState} from 'react';
import {useRandKey} from 'hooks/animation';
import {useSharedElementContext} from 'context';
import {FrontEndHelper} from 'services';
import {useDispatch, useSelector} from 'react-redux';
import {profileEditorSelector, updateAvatar} from 'slices';

export function useAvatarSelection(sharedElementID)
{
    const [visible, setVisible] = useState(false);
    const boxKey                = useRandKey();
    const dispatch              = useDispatch();
    const {resetSharedElement}  = useSharedElementContext();
    const avatars               = FrontEndHelper.GetAvatars();
    const {avatar}              = useSelector(profileEditorSelector);

    if (!avatar)
        dispatch(updateAvatar(avatars[0]));

    const show = () => {
        // This will animate the shared element
        // even if we still in the same page
        boxKey.regen();
        setVisible(true);
    };

    const hide = () => {
        // Cleanup shared element
        resetSharedElement(sharedElementID);
        // Regen new key for the next animation
        boxKey.regen();
        setVisible(false);
    };

    const onSelected = avatar => {
        dispatch(updateAvatar(avatar));
        hide();
    };

    return {
        visible,
        avatars,
        cancel: hide,
        show,
        onSelected,
        avatar,
        key   : boxKey.key,
    };
}
