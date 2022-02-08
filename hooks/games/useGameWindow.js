import {useCallback, useEffect, useRef, useState} from 'react';
import {useScrollGap} from 'hooks';
import {isMobile} from 'app/device';
import {setSubMenuVisible} from 'slices';
import {useDispatch} from 'react-redux';

export function useGameWindow(games)
{
    const scrollGap                         = useScrollGap();
    const [visible, setVisible]             = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch                          = useDispatch();
    const lastFocused                       = useRef();
    const defaultView                       = useRef('');
    const gameWindowRef                     = useRef();

    const quickMatch = (gameIndex) => {
        defaultView.current = 'quick-match';
        open(gameIndex);
    };

    const open = (gameIndex) => {
        lastFocused.current = document.activeElement;
        setSelectedIndex(gameIndex);
        setVisible(true);
        if (isMobile)
            dispatch(setSubMenuVisible(false));
        scrollGap.open();
    };

    const close = () => {
        setVisible(false);
        scrollGap.close();
        if (isMobile)
            dispatch(setSubMenuVisible(true));
        defaultView.current = '';
    };

    const next = useCallback(() => {
        if (selectedIndex + 1 < games.length)
            setSelectedIndex(selectedIndex + 1);
    }, [selectedIndex, games]);

    const prev = useCallback(() => {
        if (selectedIndex - 1 >= 0)
            setSelectedIndex(selectedIndex - 1);
    }, [selectedIndex]);

    useEffect(() => {

        if (games.length === 0)
        {
            setVisible(false);
            return;
        }

        if (selectedIndex === games.length)
            setSelectedIndex(games.length - 1);
    }, [games]);

    return {
        visible,
        defaultView,
        open,
        close,
        quickMatch,
        next,
        prev,
        selectedIndex,
        lastFocused,
        gapOpen: scrollGap.isOpen,
        gameWindowRef
    };
}
