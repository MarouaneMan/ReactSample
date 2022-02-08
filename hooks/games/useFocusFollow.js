import {useRef} from 'react';
import {isMobile} from 'app/device';

export function useFocusFollow({scrollPaddingTop, scrollPaddingBottom, minTop})
{
    const ref                  = useRef();
    const defaultScrollPadding = isMobile ? 45 : 120;
    const scrollPadding        = {
        top   : scrollPaddingTop || defaultScrollPadding,
        bottom: scrollPaddingBottom || defaultScrollPadding
    };

    const onFocus = (e) => {
        if (e.target.offsetTop < (minTop || 200))
        {
            ref.current.scrollTop = 0;
            return ;
        }

        if (ref.current.scrollTop > 0)
        {
            // Padding top
            let diffTop = e.target.offsetTop - ref.current.scrollTop;
            if (diffTop < scrollPadding.top)
                ref.current.scrollTop -= scrollPadding.top - diffTop;

            // Padding bottom
            let diffBottom = (ref.current.scrollTop + window.innerHeight) - (e.target.offsetTop + e.target.offsetHeight);
            if (diffBottom < scrollPadding.bottom)
                ref.current.scrollTop += scrollPadding.bottom - diffBottom;
        }
    };

    return {ref, onFocus};
}
