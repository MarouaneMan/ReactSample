import * as S from './ProfileAvatar.style';
import {Avatar, IconUserEdit} from 'components/ui';
import {avatarURL} from 'helpers';

export function ProfileAvatar({avatar, ...props})
{
    return (
        <S.Wrapper {...props} focusOnMount>
            <Avatar src={avatarURL((avatar && avatar.file) || '')} />
            <S.Icon>
                <IconUserEdit/>
            </S.Icon>
        </S.Wrapper>
    );
}
