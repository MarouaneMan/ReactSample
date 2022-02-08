import {GameSession} from 'components/games/game-session/GameSession';
import {useGameLobbySession} from 'hooks';
import {If} from 'helpers';
import {SESSION_STATE} from 'slices';

export function GameLobbySession({game})
{
    const {session} = useGameLobbySession({game});

    return (
        <If condition={session.hasSession.current && session.sessionState.id > SESSION_STATE.STARTING.id}>
            <GameSession game={game}/>
        </If>
    );
}
