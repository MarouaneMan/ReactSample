import {useRef} from 'react';

export function useFirstRef(forwardedRef)
{
    const ownRef = useRef();
    const ref    = forwardedRef || ownRef;

    const firstRef = e => {
        if (!ref.current)
            ref.current = e;
    };

    const clear = () => {
        ref.current = null;
    };

    const shimRef = (callback) => (ref) => {

        if (!ref.current)
        {
            callback(ref);
            ref.current = ref;
        }
    };

    return {shimRef, firstRef, clear, ref};
}
