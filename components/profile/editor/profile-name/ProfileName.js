import {If} from 'helpers';
import {IconLocked, IconUnlocked} from 'components/ui';
import Theme from 'app/theme';
import * as S from './ProfileName.style';

export function ProfileName({profileName, locked})
{
    return (
        <S.Tag>
            <S.Text>
                {profileName}
            </S.Text>
            <S.Icon>
                <If condition={locked}>
                    <IconLocked fill={Theme.COLORS.WHITE}/>
                </If>
                <If condition={!locked}>
                    <IconUnlocked fill={Theme.COLORS.WHITE}/>
                </If>
            </S.Icon>
        </S.Tag>

    );
}
