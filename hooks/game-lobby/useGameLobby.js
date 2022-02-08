import {Authentication, LocalStore} from 'services';
import {forceGameLobbyStart, gameLobbySelector, LOBBY_STATE, resetGameLobby, setGameLobbyState} from 'slices';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

export function useGameLobby()
{
    const dispatch     = useDispatch();
    const {lobbyState} = useSelector(gameLobbySelector);

    // Clean lobby state on unmount
    useEffect(() => {
        return () => dispatch(resetGameLobby());
    }, []);

    // Refresh token & change lobby state
    const join = async () => {

        // Force play
        if (lobbyState.id === LOBBY_STATE.FORCE_PLAY.id)
        {
            dispatch(forceGameLobbyStart());
            return ;
        }

        // Step 1 : Refresh token, we need to ensure that the token is valid
        // to avoid an unnecessary chat reboot
        const result = await Authentication.RefreshToken();
        if (result.refreshed)
        {
            dispatch(setGameLobbyState(LOBBY_STATE.CONNECTING));
            return;
        }

        // Failed to refresh token for some reason
        //
        // Panic, unrecoverable error
        // Save panic to LocalStore (debug)
        LocalStore.Set('last_token_panic', JSON.stringify(result.why));
        LocalStore.Set('last_token_panic_time', new Date().toString());

        // Clear tokens
        Authentication.ClearTokens();

        // Reload the page
        window.location.reload();
    };

    return {join, lobbyState};
}
