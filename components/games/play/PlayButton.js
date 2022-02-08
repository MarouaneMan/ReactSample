import {useRef} from 'react';
import ReactDOM from 'react-dom';
import {ConfirmationBox, LoadingButton, PrimaryButton} from 'components/ui';
import {useEulaVerification, useStartSession} from 'hooks';
import {GameSession} from 'components/games';
import {Eula} from 'components/games/eula/Eula';
import {useTranslation} from 'react-i18next';
import {globalMessageBoxSelector, SESSION_STATE} from 'slices';
import {If} from 'helpers';
import {useGamepadCheck} from 'hooks/games/useGamepadCheck';
import {useConnectionSpeedCheck} from 'hooks/games/useConnectionSpeedCheck';
import {useSelector} from 'react-redux';

export function PlayButton({game, ...props})
{
    const {t}                                      = useTranslation();
    const eula                                     = useEulaVerification(game);
    const gamepadCheck                             = useGamepadCheck(game);
    const connectionSpeedCheck                     = useConnectionSpeedCheck();
    const ref                                      = useRef();
    const globalMessageBox                         = useSelector(globalMessageBoxSelector);
    const {startSession, sessionState, hasSession} = useStartSession({
        game,
        onSessionTerminated: () => {
            // Check if the global message box isn't open
            if (!globalMessageBox.message)
                ref.current.focus();
        }
    });

    return (
        <>
            <If condition={connectionSpeedCheck.visible}>
                {ReactDOM.createPortal(
                    <ConfirmationBox
                        {...connectionSpeedCheck.propsMessageBox()}
                        decline={t('buttons.cancel')}
                        onAccept={connectionSpeedCheck.accepted}
                        onDecline={connectionSpeedCheck.close}/>
                    , document.body)}
            </If>

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

            <If condition={hasSession.current && sessionState.id > SESSION_STATE.STARTING.id}>
                <GameSession game={game}/>
            </If>

            <LoadingButton {...props}
                           ref={ref}
                           isLoading={hasSession.current && sessionState.id}
                           button={PrimaryButton}
                           loadingText={sessionState.id && t(`game_session.${sessionState.label}`)}
                           onClick={connectionSpeedCheck.protect(gamepadCheck.protect(eula.protect(startSession)))}>
                {t('buttons.play')}
            </LoadingButton>
        </>
    );
}
