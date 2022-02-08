import {useEffect, useRef} from 'react';
import {useSharedElementCloneContext, useSpatialNavContext, useSpatialNavSectionContext} from 'context';

export function useSpatialNav(props, forwardedRef)
{
    const {addFocusable, removeFocusable, setFocus, makeFocusable} = useSpatialNavContext();
    const parent                                                   = useSpatialNavSectionContext();
    const isClone                                                  = useSharedElementCloneContext();
    const ownRef                                                   = useRef();
    const ref                                                      = forwardedRef || ownRef;

    useEffect(() => {
        addFocusable({
            target      : ref.current,
            parent      : (parent && parent.ref.current) || null,
            overrideMove: {
                left : props.overrideMoveLeft,
                right: props.overrideMoveRight,
                up   : props.overrideMoveUp,
                down : props.overrideMoveDown
            },
            disableMove : {
                left : props.disableMoveLeft,
                right: props.disableMoveRight,
                up   : props.disableMoveUp,
                down : props.disableMoveDown
            },
            animatable  : props.animatable
        });

        makeFocusable(ref.current);

        // focusOnMount
        if (props.focusOnMount && !isClone)
            setFocus(ref.current);

        // set default
        if (props.defaultElement)
        {
            if (!parent)
                throw new Error('To be a default element, focusable Component must be in a SpatialNavSection');
            parent.setDefault(ref.current);
        }

        const node       = ref.current;
        const parentNode = (parent && parent.ref.current) || null;
        return () => removeFocusable({
            target: node,
            parent: parentNode,
        });
    }, []);

    return {ref};
}
