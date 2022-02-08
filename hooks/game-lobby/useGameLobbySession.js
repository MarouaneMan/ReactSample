import {useDispatch, useSelector} from 'react-redux';
import {
    gameLobbySelector,
    LOBBY_STATE,
    profileSelector,
    resetGameLobby, SESSION_STATE,
    setGameLobbyState,
    showGlobalMessageBox,
    updateLobby
} from 'slices';
import {useCallback, useEffect, useRef} from 'react';
import {gsChatModule} from 'gschatmodule';
import {Authentication} from 'services';
import {useTranslation} from 'react-i18next';
import {useStartSession} from '../game-session';

export function useGameLobbySession({game})
{
    const {ownerUID, forceStart, lobbyState} = useSelector(gameLobbySelector);
    const dispatch                           = useDispatch();
    const {currentProfile}                   = useSelector(profileSelector);
    const {t}                                = useTranslation();
    const lobby                              = useRef();
    const session                            = useStartSession({
        game,
        onSessionTerminated: () => {
            // Session terminated
            dispatch(resetGameLobby());
        }
    });

    // Lobby contains non serializable objects
    const flattenLobby = (lb) => {
        let flat = {
            ownerUID: lb.owner.uid,
            players : [],
        };
        lb.slots.forEach(slot => {
            if (slot.ready)
            {
                flat.players.push({
                    nickname: slot.player.nickname,
                    uid     : slot.player.uid
                });
            }
        });
        return flat;
    };

    // Authentication success, valid jwt token
    const onAuthenticationSuccess = () => {

        let selectedGame = gsChatModule.chat.getGameList().find(g => g.alias === game.alias);
        if (selectedGame)
        {
            // Change lobby state
            dispatch(setGameLobbyState(LOBBY_STATE.WAITING_PLAYERS));

            // Request a quick match start
            selectedGame.requestMultiQuickMatchStart(1); // 1 Local player
        }
        else
        {
            // Multiplayer not available for this game
            dispatch(showGlobalMessageBox({
                type   : 'error',
                message: t('lobby.errors.game_no_multi')
            }));

            // Abort
            dispatch(resetGameLobby());
        }
    };

    // Quick match request ack
    const onQuickMatchRequestAck = (e) => {
        lobby.current = e.detail.lobby;
        dispatch(updateLobby(flattenLobby(e.detail.lobby)));
    };

    // Quick match request notification
    const onQuickMatchRequestNotification = useCallback((e) => {
        lobby.current = e.detail.lobby;
        let flatLobby = flattenLobby(e.detail.lobby);
        dispatch(updateLobby(flatLobby));

        // Show force start to the lobby's owner
        if (currentProfile.uid === flatLobby.ownerUID && lobbyState.id === LOBBY_STATE.WAITING_PLAYERS.id)
        {
            // More than 1 player && nb_players != max_lobby
            if (flatLobby.players.length > 1 && flatLobby.players.length !== game.nb_players_online_multi)
            {
                // Change lobby state
                dispatch(setGameLobbyState(LOBBY_STATE.FORCE_PLAY));
            }
        }
    }, [lobbyState]);

    // On Desist
    const onQuickMatchDesist = () => {
        dispatch(resetGameLobby());
    };

    // Monitor session error
    useEffect(() => {
        if (session.sessionError)
        {
            if (currentProfile.uid === ownerUID)
            {
                // Owner start session error:
                gsChatModule.sessionRunner.sendStartRequestError(
                    lobby.current.id,
                    session.sessionError.error
                );
            }
            else
            {
                // Guest start session error:
                gsChatModule.sessionRunner.sendGuestsJoinRequestError(
                    lobby.current.id,
                    session.sessionError.error
                );
            }

            // Abort
            dispatch(resetGameLobby());
        }
    }, [session.sessionError]);


    // Monitor session state
    useEffect(() => {

        // Session is running
        if (session.sessionState.id >= SESSION_STATE.RUNNING.id)
        {
            if (currentProfile.uid === ownerUID)
            {
                // Send owner start request ack
                gsChatModule.sessionRunner.sendQuickMatchOwnerStartRequestAck(
                    lobby.current.id,
                    session.sessionData.sessionId);
            }
            else
            {
                // Send guest join request ack
                gsChatModule.sessionRunner.sendQuickMatchGuestJoinRequestAck(
                    lobby.current.id,
                    session.sessionData.sessionId
                );
            }
            // Change lobby state
            dispatch(setGameLobbyState(LOBBY_STATE.PLAYING));
        }
    }, [session.sessionState]);

    // Monitor force play
    useEffect(() => {
        if (forceStart)
        {
            // Ask gsChatModule for start
            lobby.current.askForStart();
        }
    }, [forceStart])

    // Quick match start request
    const onQuickMatchStartRequest = useCallback(() => {

        // Change lobby state
        dispatch(setGameLobbyState(LOBBY_STATE.STARTING));

        // Start session
        session.startSession({
            isMultiplayer : true,
            owner         : true,
            lobbyStructure: flattenLobby(lobby.current).players.map(p => p.uid)
        });
    }, []);

    // Quick match join request
    const onQuickMatchJoinRequest = (e) => {
        // Start session
        session.startSession({
            isMultiplayer   : true,
            owner           : false,
            masterSessionKey: e.detail.lobby.masterSessionKey,
        });
    };

    // Lobby Close
    const onLobbyClose = () => {
        dispatch(resetGameLobby());
    };

    // GsClose
    const onClose = () => {
        dispatch(resetGameLobby());
    };

    const onAuthenticationError = () => {
        // This should never happen
        dispatch(showGlobalMessageBox({
            type   : 'error',
            message: t('error.internal')
        }));
        dispatch(resetGameLobby());
    };

    // Quick match error, show internal error
    const onQuickMatchError = () => {
        dispatch(showGlobalMessageBox({
            type   : 'error',
            message: t('error.internal')
        }));
        dispatch(resetGameLobby());
    };

    // GsChatModule error, show internal error
    const onError = () => {
        dispatch(showGlobalMessageBox({
            type   : 'error',
            message: t('error.internal')
        }));
        dispatch(resetGameLobby());
    };

    // Boot gs chat module
    const bootChat = () => {
        gsChatModule.boot({
            websocketURL          : process.env.REACT_APP_CHAT_SERVER_URL,     // Chat server url
            websocketSecure       : true,                                      // Always true as gamepads will only work in secure contexts
            preventAutojoin       : true,
            checkForjQuery        : false,
            token                 : Authentication.GetTokens().token,          // JWT Token
            uid                   : currentProfile.uid,                        // Profile uid
            preventSGXSessionStart: true,
            backendURL            : '',                                        // Unused as we prevent session start
            inDiv                 : true                                       // Unused as we prevent session start
        });
    };

    useEffect(() => {

        document.addEventListener('gs-auth', onAuthenticationSuccess);
        document.addEventListener('gs-quick-match-request-ack', onQuickMatchRequestAck);
        document.addEventListener('gs-quick-match-request-notification', onQuickMatchRequestNotification);
        document.addEventListener('gs-quick-match-desist', onQuickMatchDesist);
        document.addEventListener('gs-quick-match-owner-start-request', onQuickMatchStartRequest);
        document.addEventListener('gs-quick-match-guests-join-request', onQuickMatchJoinRequest);
        document.addEventListener('gs-lobby-close', onLobbyClose);
        document.addEventListener('gs-close', onClose);
        document.addEventListener('gs-auth-error', onAuthenticationError);
        document.addEventListener('gs-quick-match-error', onQuickMatchError);
        document.addEventListener('gs-error', onError);

        return () => {
            document.removeEventListener('gs-auth', onAuthenticationSuccess);
            document.removeEventListener('gs-quick-match-request-ack', onQuickMatchRequestAck);
            document.removeEventListener('gs-quick-match-request-notification', onQuickMatchRequestNotification);
            document.removeEventListener('gs-quick-match-desist', onQuickMatchDesist);
            document.removeEventListener('gs-quick-match-owner-start-request', onQuickMatchStartRequest);
            document.removeEventListener('gs-quick-match-guests-join-request', onQuickMatchJoinRequest);
            document.removeEventListener('gs-lobby-close', onLobbyClose);
            document.removeEventListener('gs-close', onClose);
            document.removeEventListener('gs-auth-error', onAuthenticationError);
            document.removeEventListener('gs-quick-match-error', onQuickMatchError);
            document.removeEventListener('gs-error', onError);
        };

    }, [lobbyState])

    // Clean game lobby state on unmount
    useEffect(() => {

        // Boot the chat
        bootChat();

        return () => {
            try
            {
                if (lobby.current)
                {
                    // hoping SO_LINGER
                    lobby.current.askForQuit();
                }
                gsChatModule.close();
            }
            catch (e)
            {
            }
            dispatch(resetGameLobby());
        };
    }, []);

    return {session};
}
