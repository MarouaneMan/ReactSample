import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gameSessionSelector, sessionTerminated, setSessionError} from 'slices';

export function useNaclClient()
{
    const ref         = useRef();
    const logRef      = useRef();
    const {SGXConfig} = useSelector(gameSessionSelector);
    const dispatch    = useDispatch();

    useEffect(() => {


        // Tizen remote control back
        //
        // TODO: Fix InputDispatcherProvider layers and use useBackPress hook
        //       instead of the event listener bellow
        const onBackPressed = (e) => {
            if (e.keyCode === 10009)
                dispatch(sessionTerminated());
        };
        window.addEventListener('keydown', onBackPressed);

        // Message listener
        ref.current.addEventListener('message', (e) => {
            if (e.data === 'Exit Done')
            {
                console.log('Exit done signal received');
                dispatch(sessionTerminated());
                ref.current    = null;
                logRef.current = null;
            }
            else if (logRef.current)
            {
                logRef.current.append(e.data, document.createElement('br'));
            }
        });

        // Nacl module loaded
        ref.current.onload = () => {

            // Post start command line
            ref.current.postMessage(`Start ${SGXConfig.cmdLine}`);

            // Focus nacl module
            ref.current.focus();
        };

        // Nacl module error
        ref.current.onerror = (e) => {

            console.error('Failed to load Nacl Module', e);
            dispatch(setSessionError({
                type : 'error',
                error: 'error.internal'
            }));
            ref.current = null;
        };

        // Post Quit Message on unMount
        return () => {
            if (ref.current)
                ref.current.postMessage('Quit');

            window.removeEventListener('keydown', onBackPressed);
        };
    }, []);

    // SGXConfig.cmdLine;
    return {ref, logRef};
}
