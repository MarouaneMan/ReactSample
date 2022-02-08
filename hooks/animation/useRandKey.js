import {useMemo, useRef} from 'react';
import uniqid from 'uniqid';

export function useRandKey()
{
    const key = useRef(useMemo(() => uniqid(), []));

    const regen = () => {
        key.current = uniqid();
    };

    return {key: key.current, regen};
}
