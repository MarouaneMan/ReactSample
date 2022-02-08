import {useEffect, useState} from 'react';
import {ConfigFront} from 'services';

export function usePreLoader()
{
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([ConfigFront.Load()]).then(() => {
            setIsLoading(false);
        }).catch((err) => {
            // trick to show error boundaries while in hook, thread : https://github.com/facebook/react/issues/14981
            setIsLoading(() => {
                throw err;
            })
        });
    }, []);

    return isLoading;
}
