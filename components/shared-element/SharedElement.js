import ReactDOM from 'react-dom';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSharedElementContext, SharedElementCloneContext} from 'context';
import {isTV, isAndroid} from 'app/device';

function SharedElementBase({id, children, zIndex, duration, timingFunc, scale, freeze})
{
    const {getRect, setRect, getRoot} = useSharedElementContext();
    const sourceRect                  = useMemo(() => getRect(id), []);
    const ref                         = useRef();
    const cloneRef                    = useRef();
    const [animated, setAnimated]     = useState(false);
    const animatedRef                 = useRef(animated);
    let shouldAnimate                 = sourceRect && !animated && !freeze;

    useEffect(() => {

        // Do nothing when the element is not displayed
        if (window.getComputedStyle(ref.current).display === 'none')
            return;

        // Save current node rect as it will be used
        // as the source rect for the next node
        const boundingRect = ref.current.getBoundingClientRect();
        let rect           = {
            x     : boundingRect.left,
            y     : boundingRect.top,
            width : boundingRect.width,
            height: boundingRect.height
        };
        setRect(id, rect);

        // Animate clone
        if (shouldAnimate)
        {
            if (rect.x === sourceRect.x &&
                rect.y === sourceRect.y &&
                rect.width === sourceRect.width &&
                rect.height === sourceRect.height)
            {
                setAnimated(animatedRef.current = true);
                return;
            }

            cloneRef.current.style.transitionTimingFunction = timingFunc || 'linear';
            cloneRef.current.style.transitionDuration       = duration || '0.3s';

            // !! Gsap calls "onComplete" callback before transition end !!
            if (scale)
            {
                let translateX                            = rect.x - sourceRect.x - (sourceRect.width - rect.width) / 2;
                let translateY                            = rect.y - sourceRect.y - (sourceRect.height - rect.height) / 2;
                let scaleX                                = rect.width / sourceRect.width;
                let scaleY                                = rect.height / sourceRect.height;
                cloneRef.current.style.transform          = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
                cloneRef.current.style.transitionProperty = 'transform';
            }
            else
            {
                cloneRef.current.style.width              = rect.width + 'px';
                cloneRef.current.style.height             = rect.height + 'px';
                cloneRef.current.style.left               = rect.x + 'px';
                cloneRef.current.style.top                = rect.y + 'px';
                cloneRef.current.style.transitionProperty = 'width, height, left, top';
            }

            cloneRef.current.addEventListener('transitionend', (e) => {
                if (e.target === e.currentTarget && !animatedRef.current)
                    setAnimated(animatedRef.current = true);
            });
        }

        // Watch window change
        const measure = () => {
            const boundingRect = ref.current.getBoundingClientRect();
            let rect           = {
                x     : boundingRect.left,
                y     : boundingRect.top,
                width : boundingRect.width,
                height: boundingRect.height
            };
            setRect(id, rect);
        };
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);

    }, []);

    let cloneStyle = {
        position : 'absolute',
        zIndex   : zIndex || 1,
        width    : sourceRect && sourceRect.width,
        height   : sourceRect && sourceRect.height,
        left     : sourceRect && sourceRect.x,
        top      : sourceRect && sourceRect.y,
        margin   : 0,
        maxWidth : 10000,
        maxHeight: 10000,
        overflow : 'hidden',
        boxSizing: 'border-box',
    };

    // Disable nested shared nodes
    const disableNestedSharedNode = (node) => {
        if (!node)
            return node;
        let rand = Math.random();
        if (node.type === SharedElement)
            return React.cloneElement(node.props.children, {id: rand, name: rand, style: {opacity: 0}});
        if (node.props && node.props.children)
            return React.cloneElement(node, {
                id: rand, name: rand, children: disableNestedSharedChildren(node.props.children)
            });
        if (node.props)
            return React.cloneElement(node, {id: rand, name: rand});
        return node;
    };

    const disableNestedSharedChildren = (nodes) => {
        if (!nodes)
            return null;
        if (Array.isArray(nodes))
            return React.Children.map(nodes, child => disableNestedSharedNode(child));
        else
            return disableNestedSharedNode(nodes);
    };

    return (
        <>
            {React.cloneElement(children, {
                style: {...children.props.style, opacity: shouldAnimate ? 0 : 1},
                ref  : (el) => ref.current = el
            })}

            {shouldAnimate &&
            <SharedElementCloneContext.Provider value={true}>
                {ReactDOM.createPortal(
                    React.cloneElement(children, {
                        style   : {...children.props.style, ...cloneStyle},
                        ref     : (el) => cloneRef.current = el,
                        children: disableNestedSharedChildren(children.props.children),
                    }),
                    getRoot(),
                )}
            </SharedElementCloneContext.Provider>}

        </>
    );
}

function SharedElementLimited({scale, children, ...props})
{
    // Do nothing
    return children;
}

export const SharedElement = (isTV || isAndroid) ? SharedElementLimited : SharedElementBase;
