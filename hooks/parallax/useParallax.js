import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {globalNavigationSelector} from 'slices';

export function useParallax(target, amount)
{
    const translateY   = useRef(0);
    const {currentTab} = useSelector(globalNavigationSelector);

    const handleOnScroll = (e) => {
        if (target.current)
        {
            let eventTarget                = e.currentTarget;
            translateY.current             = -eventTarget.scrollTop * amount;
            target.current.style.transform = `translate3d(0,${translateY.current}px,0)`;
        }
    };

    useEffect(() => {
        translateY.current             = 0;
        target.current.style.transform = `translate3d(0,${translateY.current}px,0)`;

        let element = document.getElementById('GamesWrapper');
        if (element)
        {
            element.addEventListener('scroll', handleOnScroll);
            return () => element.removeEventListener('scroll', handleOnScroll);
        }
    }, [currentTab]);

    return {translateY};
}
