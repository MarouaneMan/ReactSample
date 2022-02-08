import {GameLobbySession} from 'components/games/game-lobby-session/GameLobbySession';
import {ConfirmationBox, LoadingButton, PrimaryButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import {useEulaVerification, useGameLobby} from 'hooks';
import {Eula} from 'components/games/eula/Eula';
import {LOBBY_STATE} from 'slices';
import {If} from 'helpers';
import ReactDOM from 'react-dom';
import {useGamepadCheck} from 'hooks/games/useGamepadCheck';

export function JoinLobbyButton({game, ...props})
{
    const {t}                = useTranslation();
    const eula               = useEulaVerification(game);
    const gamepadCheck       = useGamepadCheck(game);
    const {join, lobbyState} = useGameLobby();

    return (
        <>
            <If condition={gamepadCheck.visible}>
                {ReactDOM.createPortal(
                    <ConfirmationBox
                        {...gamepadCheck.propsGamepadMessageBox()}
                        decline={t('buttons.cancel')}
                        onAccept={gamepadCheck.accepted}
                        onDecline={gamepadCheck.close}/>
                    , document.body)}
            </If>

            <If condition={eula.visible}>
                {ReactDOM.createPortal(
                    <Eula game={game} readOnly={false}
                          onApproved={eula.accepted}
                          onClose={eula.close}/>,
                    document.body)}
            </If>

            <If condition={lobbyState.id > LOBBY_STATE.INITIAL.id}>
                <GameLobbySession game={game}/>
            </If>

            <LoadingButton {...props}
                           isLoading={lobbyState.id !== LOBBY_STATE.INITIAL.id}
                           button={PrimaryButton}
                           loadingText={t(`lobby.${lobbyState.label}`)}
                           forceClick={lobbyState.id === LOBBY_STATE.FORCE_PLAY.id}
                           showLoadingText={lobbyState.id === LOBBY_STATE.FORCE_PLAY.id}
                           onClick={gamepadCheck.protect(eula.protect(join))}>
                {t('lobby.join')}
            </LoadingButton>
        </>
    );
}
