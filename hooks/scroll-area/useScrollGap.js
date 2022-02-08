import {useCallback, useRef, useState} from 'react';

export function useScrollGap()
{
    const oldGapState          = useRef(false);
    const [isOpen, setGapOpen] = useState(false);

    // Open scroll area gap
    const open = useCallback(() => {
        oldGapState.current = false;
        setGapOpen(true);
    }, []);

    // Close Scroll area gap
    const close = useCallback(() => {
        oldGapState.current = true;
        setGapOpen(false);
    }, []);

    return {open, close, isOpen};
}
