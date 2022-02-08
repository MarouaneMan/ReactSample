import {useSessionTracker} from 'hooks';
import {SESSION_STATE} from 'slices';
import {useInputDispatcherContext} from 'context';
import {NaclClient, WebClient} from './streaming-client';
import {If} from 'helpers';
import {hasTouch, isTV} from 'app/device';
import {useEffect} from 'react';

export function GameSession({game})
{
    const {sessionState}                                                 = useSessionTracker();
    const {pauseInputDispatch, resumeInputDispatch, getNumberOfGamepads} = useInputDispatcherContext();

    useEffect(() => {
        // Pause input dispatch and mouse input when streaming client is running
        pauseInputDispatch();
        document.getElementById('root').classList.add('pauseMouseInput');

        return () => {
            // Resume input dispatch and mouse input
            resumeInputDispatch();
            document.getElementById('root').classList.remove('pauseMouseInput');
        };
    }, []);

    useEffect(() => {

        // Hide all dom nodes when session is running
        if (sessionState.id === SESSION_STATE.RUNNING.id)
        {
            document.getElementById('root').classList.add('freeze');
        }
        return () => {
            document.getElementById('root').classList.remove('freeze');
        };
    }, [sessionState]);

    return (
        <If condition={sessionState.id === SESSION_STATE.RUNNING.id}>
            <If condition={isTV}>
                <NaclClient/>
            </If>
            <If condition={!isTV}>
                <WebClient enableVirtualGamepad={hasTouch() && game.is_virtual_gamepad === 'support' && getNumberOfGamepads() <= 0}/>
            </If>
        </If>
    );
}
