import {useState} from 'react';

export function useQuit()
{
    const [visible, setVisible] = useState(false);

    const callbacks = {

        doQuit: () => {
            console.log('Tizen quit');
            window.close();
            // tizen object is not available when the app is remotely distributed
            //if (window.tizen)
            //    window.tizen.application.getCurrentApplication().exit();
        },

        decline: () => {
            setVisible(false);
        },

        show: () => {
            setVisible(true);
        }
    };

    return {visible, callbacks};
}
