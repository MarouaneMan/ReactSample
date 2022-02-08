import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import uniqid from 'uniqid';
import KeyboardListener from './KeyboardListener';
import GamepadListener from './GamepadListener';

const Context = React.createContext(null);

export const useInputDispatcherContext = () => useContext(Context);

const layer = () => ({
    back  : {},
    select: {},
    up    : {},
    down  : {},
    left  : {},
    right : {},
});

const inputDevices = [new KeyboardListener(), new GamepadListener()];

export function InputDispatcherProvider({children})
{
    const layers                         = useRef(useMemo(() => [], [])).current;
    const [layersCount, setLayersChange] = useState(1);

    // Get number of Gamepads
    const getNumberOfGamepads = () => inputDevices[1].Count();

    // Get current layer
    const currentLayer = () => layers[layers.length - 1];

    // Called on input events
    const dispatchCallback = useCallback((button) => {
        // Evaluate all callbacks of the target button
        Object.values(currentLayer()[button])
              .map(callback => callback());
    }, []);

    // Register a button callback and return its unique id
    const registerCallback = useCallback((targetBtn, callback) => {
        let callbackId                        = uniqid();
        currentLayer()[targetBtn][callbackId] = callback;
        return callbackId;
    }, []);

    // unRegister a button callback
    const unRegisterCallback = useCallback((targetBtn, callbackId) => {
        delete currentLayer()[targetBtn][callbackId];
    }, []);

    // Pause input dispatch
    const pauseInputDispatch = useCallback(() => {
        inputDevices.map(inputDevice => inputDevice.Stop());
    }, []);

    // Resume input dispatch
    const resumeInputDispatch = useCallback(() => {
        inputDevices.map(inputDevice => inputDevice.Start(dispatchCallback));
    }, [dispatchCallback]);

    // Push new layer
    const pushLayer = useCallback(() => {
        layers.push(layer());
        setLayersChange(layers.length);
    }, []);

    // Pop layer
    const popLayer = useCallback(() => {
        if (layers.length > 1)
        {
            layers.pop();
            setLayersChange(layers.length);
        }
    }, []);

    // Start capture on mount
    useEffect(() => {
        inputDevices.map(inputDevice => inputDevice.Start(dispatchCallback));
    }, []);

    return (
        <Context.Provider value={{
            registerCallback, unRegisterCallback,
            pauseInputDispatch, resumeInputDispatch,
            pushLayer, popLayer,
            layersCount, getNumberOfGamepads
        }}>
            {children}
        </Context.Provider>
    );
}
