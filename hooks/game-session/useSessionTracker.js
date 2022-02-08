import SGXSessionTracker from 'sgxsessiontracker';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gameSessionSelector, sessionRunning, sessionTerminated, setSessionError} from 'slices';

export function useSessionTracker()
{
    const {sessionData, sessionState} = useSelector(gameSessionSelector);
    const dispatch                    = useDispatch();

    useEffect(() => {

        let tracker = new SGXSessionTracker({
            server            : sessionData.ipTracker,
            session_id        : sessionData.sessionId,
            reconnect_attempts: 5,
            ssl               : true
        });

        tracker.on('debug', debugString => {
            console.debug('[TRACKER DEBUG]: ' + debugString);
        });

        tracker.on('connected', () => {
            console.log('[TRACKER LOG]: Tracker connected');
        });

        tracker.on('connection_failed', remaining_attempts => {
            if (remaining_attempts === 0)
            {
                dispatch(setSessionError({
                    type : 'error',
                    error: 'game_session.unable_to_join_sever'
                }));
                console.log('[TRACKER LOG] Network error');
            }
        });

        tracker.on('session_response', response => {

            switch (response.state)
            {

                case SGXSessionTracker.States.SessionPending:
                    console.log('[TRACKER LOG]: Session pending');
                    break;

                case SGXSessionTracker.States.SessionStarted:
                    dispatch(sessionRunning());
                    console.log('[TRACKER LOG]: Session started');
                    break;

                case SGXSessionTracker.States.SessionCrashed:
                    dispatch(setSessionError({
                        type : 'error',
                        error: 'game_session.session_crashed'
                    }));
                    console.log('[TRACKER LOG]: session crashed');
                    break;

                case SGXSessionTracker.States.SessionFailedToStart:
                    dispatch(setSessionError({
                        type : 'error',
                        error: 'game_session.failed_to_start'
                    }));
                    console.log('[TRACKER LOG]: Failed to start');
                    break;

                case SGXSessionTracker.States.SessionConnectionLost:
                case SGXSessionTracker.States.SessionConnectTimeout:
                case SGXSessionTracker.States.SessionInactiveTimeout:
                case SGXSessionTracker.States.SessionDurationLimitReached:
                case SGXSessionTracker.States.SessionReconnectTimeout:
                case SGXSessionTracker.States.SessionNotFound: // Should never happen
                case SGXSessionTracker.States.SessionTerminated:
                    dispatch(sessionTerminated());
                    console.log('[TRACKER LOG]: Terminated, State = ' + response.state);
                    break;

                default:
                    console.log('[TRACKER LOG]: ' + response.state);
                    break;
            }
        });

        tracker.run();

        return () => tracker.terminate();

    }, []);

    return {sessionState};
}
