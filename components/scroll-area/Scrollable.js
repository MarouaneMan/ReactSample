import React, {useEffect, useRef} from 'react';
import {useSpatialNavContext} from 'context';
import {isAndroid, isMobile, isTV} from 'app/device';

export function Scrollable({children, isGapOpen, lastFocused})
{
    const ref                = useRef(0);
    const firstUpdate        = useRef(true);
    const spatialNavCtx      = useSpatialNavContext();
    const transitionDuration = isMobile ? 400 : 600;
    let gamesWrapper         = useRef();

    useEffect(() => {
        // TODO use a ref instead ...
        gamesWrapper.current = document.getElementById('GamesWrapper');
    }, []);

    useEffect(() => {

        // Do nothing in the first update
        if (firstUpdate.current)
        {
            firstUpdate.current = false;
            return;
        }

        const disableAnimation = isTV || isAndroid;

        // Gap Open
        if (isGapOpen)
        {
            // Disable navigation to this element
            spatialNavCtx.setEnabled(ref.current, false, false);

            // Split animation is too heavy for android/Tizen
            if (disableAnimation)
            {
                ref.current.style.pointerEvents = 'none';
                ref.current.style.animation     = 'none';
                ref.current.style.opacity       = 0;
                return;
            }

            // Check if we need to animate this element
            let gamesWrapperScrollTop = gamesWrapper.current.scrollTop;
            let shouldAnimate         =
                    ref.current.offsetTop + ref.current.offsetHeight >= gamesWrapperScrollTop
                    && ref.current.offsetTop <= gamesWrapperScrollTop + window.innerHeight;

            if (!shouldAnimate)
            {
                // Hide only
                ref.current.style.opacity = 0;
                return;
            }

            // Default Go down
            let translateY = window.innerHeight;

            // Go up
            if (ref.current.offsetTop + ref.current.offsetHeight / 2 < gamesWrapperScrollTop + window.innerHeight / 2)
                translateY *= -1;

            // Disable previous item animation
            ref.current.style.animation = 'none';
            ref.current.style.opacity   = 1;

            // Apply new transition
            requestAnimationFrame(() => {

                if (!ref.current)
                    return ;

                ref.current.style.transition = `transform ${transitionDuration}ms ease-out, opacity 0s ${transitionDuration}ms linear`;

                // Translate
                ref.current.style.transform = `translateY(${translateY}px)`;

                // Hide after translation, see transition delay
                ref.current.style.opacity = 0;

                // Disable pointer events
                ref.current.style.pointerEvents = 'none';
            });
        }
        // Gap closed
        else
        {
            // Enable navigation to this element
            spatialNavCtx.setEnabled(ref.current, true, true);

            if (!disableAnimation)
            {
                ref.current.style.transition = `transform ${transitionDuration}ms ease-out`;

                // Focus lastFocused item in the grid before open event
                if (lastFocused && lastFocused.current === ref.current)
                {
                    lastFocused.current.ontransitionend = () => {
                        lastFocused.current.focus();
                        lastFocused.current.ontransitionend = null;
                    };
                }
            }
            else if (lastFocused && lastFocused.current === ref.current)
            {
                // Focus lastFocused item in the grid before open event
                lastFocused.current.focus();
            }
            ref.current.style.transform     = `translateY(0px)`;
            ref.current.style.opacity       = 1;
            ref.current.style.pointerEvents = 'auto';
        }
    }, [isGapOpen]);

    return React.cloneElement(children, {
        ref: (el) => {
            ref.current = el;
            if (children.ref)
                children.ref.current = el;
        },
    });
}
