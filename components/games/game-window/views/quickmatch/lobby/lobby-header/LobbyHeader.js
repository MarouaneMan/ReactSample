import {ColumnLayout, IconMultiplayer, RowLayout} from 'components/ui';
import {GameHeading} from 'components/games';
import * as S from './LobbyHeader.style';
import {isMobile} from 'app/device';
import {useTranslation} from 'react-i18next';

export function LobbyHeader({game})
{
    const {t} = useTranslation();

    return (
        <RowLayout fullWidth justifyContent="space-between">
            <GameHeading game={game}/>
            <S.Wrapper>
                <ColumnLayout>
                    <S.Title>
                        {t(isMobile ? 'games.lobby_mobile' : 'games.lobby')}
                    </S.Title>
                    <S.MaxPlayers>
                        {t(isMobile ? 'games.lobby_max_players_mobile' : 'games.lobby_max_players', {
                            maxPlayers: game.nb_players_online_multi
                        })}
                    </S.MaxPlayers>
                </ColumnLayout>
                <S.TitleIcon>
                    <IconMultiplayer/>
                </S.TitleIcon>
            </S.Wrapper>
        </RowLayout>
    );
}
