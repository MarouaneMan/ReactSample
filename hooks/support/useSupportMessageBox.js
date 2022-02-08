import {useEffect, useRef, useState} from 'react';
import ConfigFront from 'services/ConfigFront';

export function useSupportMessageBox(wrapperToHideRef)
{
    const [visible, setVisible] = useState(false);
    const supportMethods        = ConfigFront.GetSupportMethods();
    const wrapperToHide         = useRef();

    const showSupport = () => {
        setVisible(true);
    };

    const hideSupport = () => {
        setVisible(false);
    };

    useEffect(() => {
        if (wrapperToHideRef?.current)
        {
            wrapperToHide.current = wrapperToHideRef.current;
        }
        else
        {
            //TODO: try to use ref for gamesWrapper
            wrapperToHide.current = document.getElementById('GamesWrapper');
        }

        if (!wrapperToHide.current)
            return;

        if (visible)
        {
            wrapperToHide.current.style.opacity       = 0;
            wrapperToHide.current.style.pointerEvents = 'none';
        }
        else
        {
            wrapperToHide.current.style.opacity       = 1;
            wrapperToHide.current.style.pointerEvents = 'auto';
        }

    }, [visible]);

    return {
        showSupport, hideSupport, visible, supportMethods
    };
}
