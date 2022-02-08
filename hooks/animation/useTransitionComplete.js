import {useEffect, useRef} from 'react';

export function useTransitionComplete(completeCallback, deps)
{
    const ref = useRef();

    useEffect(() => {

        const node = ref.current;

        node.addEventListener('transitionend', completeCallback);

        return () => node.removeEventListener('transitionend', completeCallback);

    }, deps || []);

    return ref;
}
