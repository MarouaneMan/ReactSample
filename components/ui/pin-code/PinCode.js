import * as S from './PinCode.style';
import React, {useEffect, useImperativeHandle, useRef} from 'react';
import {IconClose} from 'components/ui';
import {SpatialNavSection, useSpatialNavContext} from 'context';

export const PinCode = React.forwardRef(({focusOnMount, enabled, onChange, defaultValue, onSubmit, ...props}, forwardedRef) => {

    const pinCode      = useRef(['', '', '', '']);
    const refWrapper   = useRef();
    const {setEnabled} = useSpatialNavContext();

    // methods
    useImperativeHandle(forwardedRef, () => ({
        validate: () => {
            for (let i = 0; i < 4; i++)
            {
                if (pinCode.current[i].length !== 1)
                {
                    if (refWrapper.current)
                        refWrapper.current.children.item(i).focus();
                    else console.error('Not expected to be null', refWrapper);
                    return false;
                }
            }
            return true;
        },

        value: () => pinCode.current.join('')
    }), []);

    // Clear all
    const clear = () => {
        pinCode.current = ['', '', '', ''];
        for (let i = 0; i < 4; i++)
            refWrapper.current.children.item(i).value = '';
        refWrapper.current.children.item(0).focus();
    };

    // On Key Pressed : filter, update and focus
    const onKeyDown = (e, index) => {
        // Handle backspace/delete
        if (e.key === 'Backspace' || e.key === 'Delete')
        {
            e.preventDefault();
            if (index > 0 && pinCode.current[index] === '')
                e.target.previousSibling.focus();
            pinCode.current[index] = e.target.value = '';
            return;
        }

        // Update value
        if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57)
        {
            e.target.value         = e.key;
            pinCode.current[index] = e.target.value;
            if (index < 3)
                e.target.nextSibling.focus();
        }
        if (onChange)
            onChange(pinCode.current.join(''));
        e.preventDefault();

        if (index === 3 && e.keyCode === 13 && onSubmit)
            onSubmit();
    };

    useEffect(() => {
        if (defaultValue && defaultValue.length === 4)
        {
            pinCode.current = defaultValue.split('');
            pinCode.current.forEach((digit, index) => {
                refWrapper.current.children.item(index).value = digit;
            });
        }
    }, []);

    useEffect(() => {
        setEnabled(refWrapper.current, enabled);
    }, [enabled]);

    return (
        <SpatialNavSection enterTo="default-element" focusOnMount={!!focusOnMount}>
            <S.Wrapper {...props} ref={refWrapper}>
                <S.DigitInput defaultElement onKeyDown={e => onKeyDown(e, 0)}/>
                <S.DigitInput onKeyDown={e => onKeyDown(e, 1)}/>
                <S.DigitInput onKeyDown={e => onKeyDown(e, 2)}/>
                <S.DigitInput onKeyDown={e => onKeyDown(e, 3)}/>
                <S.Clear onClick={clear}>
                    <IconClose/>
                </S.Clear>
            </S.Wrapper>
        </SpatialNavSection>
    );

});
