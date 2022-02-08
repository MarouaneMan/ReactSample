import {useCallback, useEffect, useRef} from 'react';
import {isMobile, isSafari} from 'app/device';
import * as ScrollAreaStyle from 'components/scroll-area/ScrollArea.style';

export function useScrollArea(scrollPaddingTop, scrollPaddingBottom)
{
    const wrapperRef           = useRef();
    const ref                  = useRef();
    const touchPageY           = useRef(0);
    const touchDelta           = useRef(0);
    const translateY           = useRef(0);
    const scrollAreaRect       = useRef(0);
    const paused               = useRef(false);
    const defaultScrollPadding = isMobile ? 40 : 120;
    const animate              = true;  // Turn to false if transitions are disabled
    const scrollPadding        = {
        top   : scrollPaddingTop || defaultScrollPadding,
        bottom: scrollPaddingBottom || defaultScrollPadding
    };

    const setTransform = ({clampBottom, isWheel}) => {

        if (!ref.current)
            return;

        // Clamp top
        if (translateY.current > 0)
            translateY.current = 0;

        // Clamp bottom
        if (clampBottom)
        {
            let rect = ref.current.getBoundingClientRect();
            if (rect.height <= wrapperRef.current.offsetHeight)
            {
                translateY.current = 0;
                return;
            }

            if (translateY.current < -rect.height + wrapperRef.current.offsetHeight - scrollPadding.bottom)
                translateY.current = -rect.height + wrapperRef.current.offsetHeight - scrollPadding.bottom;
        }

        if (isSafari && animate)
        {
            // Safari flicker when triggering two concurrent transitions

            // Disable transition
            ref.current.style.transition = 'none';

            // Translate immediately on mouseWheel
            if (isWheel)
                ref.current.style.transform = `translateY(${translateY.current}px)`;

            // Run next animation
            let nextVal = translateY.current;
            const node  = ref.current;
            requestAnimationFrame(() => {
                node.style.transform  = `translateY(${nextVal}px)`;
                node.style.transition = ScrollAreaStyle.Transition;
            });
        }
        else
        {
            ref.current.style.transform = `translateY(${translateY.current}px)`;
        }
    };

    // Pause proxy, do nothing when scroll area is paused
    const usePauseProxy    = (func) => {
        return function (e) {
            if (paused.current === false)
                func(e);
        };
    };
    const pauseScrollArea  = () => paused.current = true;
    const resumeScrollArea = () => paused.current = false;

    // TouchStart
    const onTouchStart = useCallback(usePauseProxy((e) => {
        touchDelta.current = 0;
        touchPageY.current = e.touches[0].pageY;
    }), []);

    // TouchEnd
    const onTouchEnd = useCallback(usePauseProxy(() => {
        if (Math.abs(touchDelta.current) > 12)
        {
            translateY.current -= (touchDelta.current * 5);
            setTransform({clampBottom: true});
        }
    }), []);

    // TouchMove
    const onTouchMove = useCallback(usePauseProxy((e) => {

        // Prevent iOS from over-scrolling/bouncing
        e.preventDefault();

        touchDelta.current = touchPageY.current - e.touches[0].pageY;
        touchPageY.current = e.touches[0].pageY;
        translateY.current -= touchDelta.current;
        setTransform({clampBottom: true});
    }), []);

    // Mouse Wheel
    const onWheel = useCallback(usePauseProxy((e) => {
        translateY.current -= e.deltaY;
        setTransform({clampBottom: true, isWheel: true});
    }), []);

    // Keyboard/Gamepad
    const onFocus = usePauseProxy((e) => {

        let targetRect = {
            height: e.target.offsetHeight,
            top   : e.target.offsetTop + translateY.current,
        };

        // Top
        if (targetRect.top - scrollPadding.top < 0)
            translateY.current -= targetRect.top - scrollPadding.top;

        // Bottom
        if (targetRect.top + targetRect.height + scrollPadding.bottom > wrapperRef.current.offsetHeight)
            translateY.current += wrapperRef.current.offsetHeight - (targetRect.top + targetRect.height + scrollPadding.bottom);

        setTransform({clampBottom: false});
    });

    const resetScroll = () => {
        translateY.current = 0;
        setTransform({clampBottom: false});
    };

    // Setup listeners
    useEffect(() => {

        // Prevent Wrapper from scrolling
        wrapperRef.current.addEventListener('scroll', () => wrapperRef.current.scrollTop = 0);

        // Set initial scroll area rect
        const setScrollAreaRect = () => scrollAreaRect.current = wrapperRef.current.getBoundingClientRect();

        setScrollAreaRect();

        // Watch window resize and update scroll area rect
        window.addEventListener('resize', setScrollAreaRect);

        // Watch wheel / touch
        window.addEventListener('wheel', onWheel);
        window.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchmove', onTouchMove, {passive: false});
        window.addEventListener('touchend', onTouchEnd);

        return () => {
            window.removeEventListener('resize', setScrollAreaRect);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, []);

    return {
        scrollAreaRect,
        wrapperRef,
        ref,
        onFocus,
        resetScroll,
        pauseScrollArea,
        resumeScrollArea,
        paused
    };
}
