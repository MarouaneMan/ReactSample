import * as S from './Profile.style';
import {IconLocked, IconUnlocked} from 'components/ui';
import Theme from 'app/theme';
import {avatarURL, If} from 'helpers';

export function Profile({data, count, onClick})
{
    return (
        <S.Wrapper onClick={onClick}>
            <S.ProfileAvatar src={avatarURL(data.avatar.file)} count={count}/>
            <S.Tag>
                <S.Text>
                    {data.profileName}
                </S.Text>
                <S.Icon>
                    <If condition={data.locked}>
                        <IconLocked fill={Theme.COLORS.WHITE}/>
                    </If>
                    <If condition={!data.locked}>
                        <IconUnlocked fill={Theme.COLORS.GRAY_L5}/>
                    </If>
                </S.Icon>
            </S.Tag>
        </S.Wrapper>
    );
}
