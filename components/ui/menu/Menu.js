import * as S from './Menu.style';
import {useEffect, useLayoutEffect, useRef} from 'react';
import {useTransitionComplete} from 'hooks';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {globalNavigationSelector} from 'slices';
import {useSpatialNavContext} from 'context';
import {supportBackDropFilter} from 'app/device';

export function Menu({items, namespace, onItemSelected, overrideMoveUp, preventMoveRight})
{
    const wrapperRef           = useRef();
    const lastSelectedIndex    = useRef(0);
    const selectedIndex        = useRef(0);
    const {t}                  = useTranslation();
    const cursorRef            = useTransitionComplete(() => hideCursor(), []);
    const {favoritesVisible}   = useSelector(globalNavigationSelector);
    const {getPreviousFocusEl} = useSpatialNavContext();
    const fromTouchOrClick     = useRef(false);
    const itemsStartIndex      = 1 + (!supportBackDropFilter ? 1 : 0); // BlurMenuFallback adds 1 element before Cursor

    useEffect(() => {
        if (favoritesVisible)
            cleanItem(lastSelectedIndex.current + itemsStartIndex);
    }, [favoritesVisible]);

    useLayoutEffect(() => {
        semiHighlightItem(selectedIndex.current + itemsStartIndex);
    }, []);

    const cleanItem = (index) => {
        let target                   = wrapperRef.current.children.item(index);
        target.style.backgroundColor = '';
        target.style.boxShadow       = '';
        target.style.fontWeight      = '';
    };

    const semiHighlightItem = (index) => {
        const target                 = wrapperRef.current.children.item(index);
        target.style.backgroundColor = S.CurrentItemBackgroundColor;
        target.style.boxShadow       = '';
        target.style.fontWeight      = '';
    };

    const selectTarget = () => {
        let target = wrapperRef.current.children.item(selectedIndex.current + itemsStartIndex);
        if (target === document.activeElement)
        {
            target.style.backgroundColor = S.CursorItemBackgroundColor;
            target.style.boxShadow       = S.CursorItemBoxShadow;
            target.style.fontWeight      = 'bold';
        }

        // flash item menu if focus wasn't on the nav section && prevent this effect if touch or click event
        if (!wrapperRef.current.contains(getPreviousFocusEl()) && !fromTouchOrClick.current)
        {
            target.classList.add('flashing');

            target.onanimationend = () => {
                target.classList.remove('flashing');
            };
        }

        fromTouchOrClick.current = false;
    };

    const hideCursor = () => {
        // Hide Cursor
        cursorRef.current.style.opacity = 0;

        // Make target selected
        selectTarget();
    };

    const moveCursor = (position) => {
        // Move cursor to target position
        let target                        = wrapperRef.current.children.item(position + itemsStartIndex);
        let pos                           = target.getBoundingClientRect();
        cursorRef.current.style.opacity   = 1;
        cursorRef.current.style.width     = `${pos.width}px`;
        cursorRef.current.style.height    = `${pos.height}px`;
        cursorRef.current.style.transform = `translateX(${target.offsetLeft}px)`;
    };

    const onItemClicked = (index, e) => {
        let move = index !== selectedIndex.current;

        // Save selected index
        selectedIndex.current = index;

        // Clean last selected item
        cleanItem(lastSelectedIndex.current + itemsStartIndex);

        // Save last selected index
        lastSelectedIndex.current = selectedIndex.current;

        // Move cursor
        if (move)
            moveCursor(index);
        else
            selectTarget(index);

        // Trigger callback
        onItemSelected(items[index]);
    };

    const overrideMoveDown = () => {
        semiHighlightItem(selectedIndex.current + itemsStartIndex);
        return true;
    };

    const handleOverrideMoveUp = () => {
        if (overrideMoveUp)
        {
            semiHighlightItem(selectedIndex.current + itemsStartIndex);
            overrideMoveUp();
        }
    };

    const handleClickOrTouch = (e) => {
        fromTouchOrClick.current = true;
        e.target.focus();
    };

    return (
        <S.Wrapper ref={wrapperRef}>
            <S.Cursor ref={cursorRef}/>
            {items.map((item, index) =>
                <S.Item
                    disableMoveLeft={index === 0}
                    disableMoveRight={index === items.length - 1 && preventMoveRight}
                    overrideMoveDown={overrideMoveDown}
                    overrideMoveUp={handleOverrideMoveUp}
                    onFocus={(e) => onItemClicked(index, e)}
                    onClick={handleClickOrTouch}
                    onTouchStart={handleClickOrTouch}
                    content={t(`${namespace}.${item}`)}
                    key={index}
                >
                    {t(`${namespace}.${item.toLowerCase()}`)}
                </S.Item>
            )}
        </S.Wrapper>
    );
}
