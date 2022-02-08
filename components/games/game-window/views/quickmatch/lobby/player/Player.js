import {IconPlayer} from 'components/ui';
import * as S from './Player.style';
import {useTranslation} from 'react-i18next';

export function Player({name, isOwner, index, lobbyConnected})
{
    const {t} = useTranslation();

    return (
        <S.Wrapper>
            <S.PlayerIcon searching={!name}>
                <S.PlayerIndex>
                    {index + 1}
                </S.PlayerIndex>
                <IconPlayer />
            </S.PlayerIcon>
            <S.NameWrapper>
                {lobbyConnected &&
                <S.Name>
                    {name || t('games.searching')}
                </S.Name>
                }
                {isOwner && <S.MasterCrown/> }
            </S.NameWrapper>
        </S.Wrapper>
    );
}
