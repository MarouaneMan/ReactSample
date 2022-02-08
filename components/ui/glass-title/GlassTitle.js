import React, {useLayoutEffect, useRef} from 'react';
import * as S from './GlassTitle.style';
import {isTV} from 'app/device';
import {If} from 'helpers';
import {useParallax} from 'hooks/parallax/useParallax';

export function GlassTitle({children, wrapperRef, ...props})
{
    useParallax(wrapperRef, 0.25);

    const svgTextRef      = useRef();
    const titleWrapperRef = useRef();

    useLayoutEffect(() => {
        if (!isTV)
        {
            const bbox                          = svgTextRef.current.getBBox();
            const bboxDimensions                = {
                width : bbox.width,
                height: bbox.height,
            };
            titleWrapperRef.current.style.width = `${bboxDimensions.width}px`;
        }
    }, []);

    return (
        <>
            <If condition={!isTV}>
                <S.Wrapper ref={titleWrapperRef} className="headline" {...props}>
                    <S.Title className="visually-hidden">{children}</S.Title>
                    <svg aria-hidden="true" id="lockup-headline-mask" className="headline lockup-headline-mask visually-hidden"
                         style={{overflow: 'visible'}}>
                        <clipPath id="lockup-headline-mask-path">
                            <text ref={svgTextRef} dominantBaseline="hanging" textAnchor="right" x="0" y="0em"
                                  dy="0.125em">{children}</text>
                        </clipPath>
                    </svg>
                </S.Wrapper>
            </If>
            <If condition={isTV}>
                <S.WrapperTV {...props}>
                    <S.Text>
                        {children}
                    </S.Text>
                </S.WrapperTV>
            </If>
        </>
    );
}
