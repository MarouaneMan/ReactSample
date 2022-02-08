import React, {useContext, useEffect, useRef} from 'react';
import {useSpatialNavContext} from './SpatialNavContext';
import {useSharedElementCloneContext} from 'context';

const SpatialNavSectionContext = React.createContext(null);

export const useSpatialNavSectionContext = () => useContext(SpatialNavSectionContext);

export const SpatialNavSection = React.forwardRef(({children, enterTo, focusOnMount, ...props}, forwardedRef) => {

    const {addFocusable, removeFocusable, setFocus, setSectionDefaultNode} = useSpatialNavContext();
    const isClone                                                          = useSharedElementCloneContext();
    const parent                                                           = useSpatialNavSectionContext();
    const ownRef                                                           = useRef();
    const ref                                                              = forwardedRef || ownRef;
    const defaultNode                                                      = useRef();

    if (React.Children.count(children) !== 1)
    {
        console.log(children);
        throw new Error('SpatialNavSection must have one child');
    }

    useEffect(() => {

        // Add new section
        addFocusable({
            target           : ref.current,
            parent           : (parent && parent.ref.current) || null,
            enterTo          : enterTo,
            defaultChildDomEl: defaultNode.current,
            animatable       : props.animatable
        });

        // Focus section on mount
        if (focusOnMount && !isClone)
            setFocus(ref.current);

        // set default
        if (props.defaultElement)
            parent.setDefault(ref.current);

        // Cleanup section
        const node       = ref.current;
        const parentNode = (parent && parent.ref.current) || null;
        return () => removeFocusable({
            target: node,
            parent: parentNode,
        });

    }, []);

    const setDefault = (node) => {
        defaultNode.current = node;
        setSectionDefaultNode(ref.current, node);
    };

    return (
        <SpatialNavSectionContext.Provider value={{ref, setDefault}}>
            {React.cloneElement(children, {
                style: {...children.props.style},
                ref  : (el) => {
                    if (typeof forwardedRef === 'function')
                        forwardedRef(el);
                    ref.current = el;
                    if (children.ref)
                        children.ref.current = el;
                },
            })}
        </SpatialNavSectionContext.Provider>
    );
});
