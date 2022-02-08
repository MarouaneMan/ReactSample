import {resetGlobalNavigation, setSettingsVisible} from 'slices';
import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import history from 'app/history';
import Routes from 'app/routes';

export function useAsideSettings(settingsButtonRef)
{
    const wrapperRef = useRef();
    const dispatch   = useDispatch();

    const onDocumentMouseDown = (e) => {
        if (e.target !== wrapperRef.current && e.target !== settingsButtonRef.current)
            if (!wrapperRef.current?.contains(e.target) && !settingsButtonRef.current?.contains(e.target))
                dispatch(setSettingsVisible(false));
    };

    useEffect(() => {
        document.addEventListener('mousedown', onDocumentMouseDown);
        return () => document.removeEventListener('mousedown', onDocumentMouseDown);
    }, []);

    const onBlur = () => {
        setTimeout(() => {
            if (!wrapperRef.current?.contains(document.activeElement))
                dispatch(setSettingsVisible(false));
        });
    };

    const onChangeProfile = () => {
        history.push(Routes.PROFILE_SELECTION);
        dispatch(resetGlobalNavigation());
    };

    return {wrapperRef, onBlur, onChangeProfile};
}
