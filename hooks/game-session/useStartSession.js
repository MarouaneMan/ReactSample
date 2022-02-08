import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import {isTV} from 'app/device';
import i18n from 'i18n';
import {
    doLoadSGXConfig, doStartSession, gameSessionSelector,
    pinCodeCheckSelector,
    profileSelector,
    resetGameSession, SESSION_STATE,
    showGlobalMessageBox
} from 'slices';

export function useStartSession({game, onSessionTerminated})
{
    const dispatch                                  = useDispatch();
    const {sessionData, sessionState, sessionError} = useSelector(gameSessionSelector);
    const {currentProfile}                          = useSelector(profileSelector);
    const {pinCode}                                 = useSelector(pinCodeCheckSelector);
    const hasSession                                = useRef(false);
    const fps                                       = 30;
    const bitrate                                   = 8;
    const resolution                                = '720p';
    const platform                                  = isTV ? 'standard' : 'js';

    // Clean game session state on unmount
    useEffect(() => {
        return () => dispatch(resetGameSession());
    }, []);

    // Monitor session start errors
    useEffect(() => {
        if (hasSession.current && sessionError)
        {
            dispatch(showGlobalMessageBox({
                type   : sessionError.type,
                message: i18n.t(sessionError.error),
            }));
            dispatch(resetGameSession());
        }
    }, [sessionError]);

    // Monitor session state
    useEffect(() => {
        if (hasSession.current && sessionState.id === SESSION_STATE.INITIAL.id)
        {
            hasSession.current = false;
            onSessionTerminated && onSessionTerminated();
        }
    }, [sessionState]);

    // Monitor session data
    useEffect(() => {
        if (hasSession.current && sessionData)
        {
            dispatch(doLoadSGXConfig({
                sessionId: sessionData.sessionId,
                fps      : fps,
            }));
        }
    }, [sessionData]);

    // Start session
    const startSession = (multiplayer) => {

        hasSession.current = true;

        dispatch(doStartSession({
            profileUID: currentProfile.uid,
            gameAlias : game.alias,
            language  : i18n.language,
            pinCode   : pinCode,
            useGamepad: true,
            fps       : fps,
            bitrate   : bitrate,
            resolution: resolution,
            platform  : platform,
            multiplayer,
        }));
    };

    return {startSession, sessionState, sessionData, sessionError, hasSession};
}
