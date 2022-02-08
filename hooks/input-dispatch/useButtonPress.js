import {useEffect} from 'react';
import {useInputDispatcherContext} from 'context';

// Supported buttons:
// - back, select
// - up, down, left, right
export function useButtonPress(button, callback)
{
    const {registerCallback, unRegisterCallback} = useInputDispatcherContext();

    useEffect(() => {
        const id = registerCallback(button, callback);
        return () => {
            unRegisterCallback(button, id);
        };
    }, []);
}

export const useBackPress   = (callback) => useButtonPress('back', callback);
export const useSelectPress = (callback) => useButtonPress('select', callback);
export const useUpPress     = (callback) => useButtonPress('up', callback);
export const useDownPress   = (callback) => useButtonPress('down', callback);
export const useLeftPress   = (callback) => useButtonPress('left', callback);
export const useRightPress  = (callback) => useButtonPress('right', callback);
