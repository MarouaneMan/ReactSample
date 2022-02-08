import React, {useContext} from 'react';
import {useScrollArea} from 'hooks';

const Context = React.createContext(null);

export const useScrollAreaContext = () => useContext(Context);

export function ScrollAreaProvider({children, scrollPaddingTop, scrollPaddingBottom})
{
    const scrollArea = useScrollArea(scrollPaddingTop, scrollPaddingBottom);

    return (
        <Context.Provider value={{
            ref             : scrollArea.ref,
            wrapperRef      : scrollArea.wrapperRef,
            scrollAreaRect  : scrollArea.scrollAreaRect,
            onFocus         : scrollArea.onFocus,
            resetScroll     : scrollArea.resetScroll,
            paused          : scrollArea.paused,
            pauseScrollArea : scrollArea.pauseScrollArea,
            resumeScrollArea: scrollArea.resumeScrollArea
        }}>
            {children}
        </Context.Provider>
    );
}
