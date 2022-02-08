import {useDispatch, useSelector} from 'react-redux';
import {approveEula, eulaSelector, loadEula, resetEula} from 'slices';
import {useEffect} from 'react';

export function useEula({game, onError, onApproved})
{
    const {isLoading, isApproving, isApproved, eulaText, hasError} = useSelector(eulaSelector);
    const dispatch                                                 = useDispatch();

    useEffect(() => {
        // Load eula
        dispatch(loadEula(game));

        return () => {

            // Reset eula state
            dispatch(resetEula());
        };
    }, []);

    useEffect(() => {
        if (isApproved && onApproved)
            onApproved();
    }, [isApproved]);

    useEffect(() => {
        if (hasError)
            onError();
    }, [hasError]);

    const onAccept = () => {
        dispatch(approveEula(game));
    };

    return {isLoading, isApproving, onAccept, eulaText};
}
