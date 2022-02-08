import React, {useRef, useContext, useCallback} from 'react';

const SharedElementContext             = React.createContext(null);
export const SharedElementCloneContext = React.createContext(null);

export const useSharedElementContext      = () => useContext(SharedElementContext);
export const useSharedElementCloneContext = () => useContext(SharedElementCloneContext);

export function SharedElementProvider({children, renderTo})
{
    const rects = useRef({}).current;

    // Return root element
    const getRoot = useCallback(() => {
        return document.getElementById(renderTo);
    }, [renderTo]);

    // Return a node Rect by shared id
    // Rect is defined as Object{width, height, x, y}
    const getRect = useCallback((sharedID) => {
        return rects[sharedID];
    }, [rects]);

    // Set a node Rect
    const setRect = useCallback((sharedID, rect) => {
        rects[sharedID] = rect;
    }, [rects]);

    // Reset shared element rect
    const resetSharedElement = useCallback((sharedID) => {
        delete rects[sharedID];
    }, [rects]);

    // Render
    return (
        <SharedElementContext.Provider value={{getRect, setRect, getRoot, resetSharedElement}}>
            {children}
        </SharedElementContext.Provider>
    );
}
