import * as S from './ContentRatingSelector.style'
import React, {useEffect, useImperativeHandle, useRef} from 'react';

export const ContentRatingSelector = React.forwardRef(({defaultValue, onChange, contentRatingArray}, forwardedRef) => {

    const refWrapper   = useRef();
    const cursor       = useRef();
    const currentIndex = useRef(0);

    // Methods
    useImperativeHandle(forwardedRef, () => ({
        value: () => contentRatingArray[currentIndex.current]
    }), []);

    const moveCursor = (index) => {
        let left                       = refWrapper.current.children.item(index).offsetLeft;
        cursor.current.style.opacity   = '1';
        cursor.current.style.transform = `translateX(${left}px)`;
        currentIndex.current           = index;
        onChange(contentRatingArray[index]);
    };

    useEffect(() => {
        if (defaultValue)
        {
            contentRatingArray.forEach((entry, i) => {
                if (entry.alias === defaultValue.alias)
                    moveCursor(i);
            });
        }
        else
        {
            moveCursor(0);
        }
    }, []);

    return (
        <S.Wrapper ref={refWrapper}>
            {contentRatingArray.map((item, index) =>
                <S.Item key={index} defaultElement={index === 0} onClick={() => moveCursor(index)}>
                    <S.Text>
                        {item.name}
                    </S.Text>
                </S.Item>
            )}
            <S.Cursor ref={cursor}/>
        </S.Wrapper>
    );
});
