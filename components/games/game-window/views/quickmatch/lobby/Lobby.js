import * as S from './Lobby.style';
import {LobbyHeader} from './lobby-header/LobbyHeader';
import {Player} from './player/Player';
import {gameLobbySelector, LOBBY_STATE} from 'slices';
import {useSelector} from 'react-redux';

export function Lobby({game})
{
    const {players, ownerUID, lobbyState} = useSelector(gameLobbySelector);

    return (
        <S.Wrapper>
            <LobbyHeader game={game}/>
            <S.PlayersWrapper>
                {[...Array(game.nb_players_online_multi)].map((_, index) =>
                    <Player key={index}
                            index={index}
                            name={index < players.length && players[index].nickname}
                            lobbyConnected={lobbyState.id > LOBBY_STATE.CONNECTING.id}
                            isOwner={index < players.length && players[index].uid === ownerUID}/>
                )}
            </S.PlayersWrapper>
        </S.Wrapper>
    );
}
