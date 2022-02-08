import React, {useCallback, useContext, useEffect, useRef} from 'react';
import * as InputDispatch from 'hooks/input-dispatch';
import SpatialNav from './SpatialNav';
import {useInputDispatcherContext} from '../input-dispatcher/InputDispatcherContext';

const SpatialNavContext = React.createContext(null);

export const useSpatialNavContext = () => useContext(SpatialNavContext);

export function SpatialNavProvider({children, debugDraw, debug})
{
    const {pushLayer, popLayer} = useInputDispatcherContext();
    const SN                    = useRef(new SpatialNav({debug_draw: debugDraw, debug: debug})).current;
    const lastFocused           = document.activeElement;

    // Get previous focused Element
    const getPreviousFocusEl = useCallback(() => SN.getPreviousFocusEl(), []);

    // Add focusable to SN tree
    const addFocusable = useCallback(params => SN.addFocusable(params), []);

    // Remove focusable from SN tree
    const removeFocusable = useCallback(params => SN.removeFocusable(params), []);

    // Focus item
    const setFocus = useCallback(params => SN.setFocus(params), []);

    // Make element focusable
    const makeFocusable = useCallback(params => SN.makeFocusable(params), []);

    // Enable || disable focusable
    const setEnabled = useCallback((domEl, state, parentState) => SN.setEnabled(domEl, state, parentState), []);

    // Refresh tree rects
    const refreshTree = useCallback((params) => SN.refreshTreeRects(params), []);

    // Set section default node
    const setSectionDefaultNode = useCallback((sectionDomEl, childEl) => SN.setSectionDefaultNode(sectionDomEl, childEl), []);

    useEffect(() => {

        // Push a new layer
        pushLayer();

        // Pop layer
        return () => popLayer();

    }, []);

    // Input handlers
    InputDispatch.useUpPress(() => SN.moveUp());
    InputDispatch.useDownPress(() => SN.moveDown());
    InputDispatch.useLeftPress(() => SN.moveLeft());
    InputDispatch.useRightPress(() => SN.moveRight());
    InputDispatch.useSelectPress(() => document.activeElement.click());

    useEffect(() => {
        return () => {
            // focus last element when this provider is unmounted
            if (lastFocused)
                lastFocused.focus();
        };
    }, []);

    return (
        <SpatialNavContext.Provider value={{
            addFocusable, removeFocusable,
            setFocus, makeFocusable, setEnabled,
            refreshTree, setSectionDefaultNode,
            getPreviousFocusEl
        }}>
            {children}
        </SpatialNavContext.Provider>
    );
}
