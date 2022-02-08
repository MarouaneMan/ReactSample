import {useInputDispatcherContext} from 'context';
import {useEffect, useRef} from 'react';

// Use this hook to get events even when useExclusiveDispatch is called
export function useStickyButtonPress(button, callback)
{
    const {layersCount, registerCallback, unRegisterCallback} = useInputDispatcherContext();
    const lastLayersCount                                     = useRef(0);

    useEffect(() => {

        const layerState = layersCount > lastLayersCount.current ? 'push' : 'pop';

        let id = null;

        // Register only when a layer is pushed
        if (layerState === 'push')
            id = registerCallback(button, callback);

        lastLayersCount.current = layersCount;

        return () => {
            // unRegister only when a layer is popped
            if (id && layerState === 'pop')
                unRegisterCallback(button, id);
        };
    }, [layersCount]);
}

// Sticky version
export const useStickyBackPress   = (callback) => useStickyButtonPress('back', callback);
export const useStickySelectPress = (callback) => useStickyButtonPress('select', callback);
export const useStickyUpPress     = (callback) => useStickyButtonPress('up', callback);
export const useStickyDownPress   = (callback) => useStickyButtonPress('down', callback);
export const useStickyLeftPress   = (callback) => useStickyButtonPress('left', callback);
export const useStickyRightPress  = (callback) => useStickyButtonPress('right', callback);
