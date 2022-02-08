import {useEffect, useRef} from 'react';

export function useAnimationComplete(completeCallback, deps)
{
    const ref = useRef();

    useEffect(() => {

        const node = ref.current;

        node.addEventListener('animationend', completeCallback);

        return () => node.removeEventListener('animationend', completeCallback);

    }, deps || []);

    return ref;
}
