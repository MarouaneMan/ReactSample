import {useDispatch, useSelector} from 'react-redux';
import {globalMessageBoxSelector, hideGlobalMessageBox} from 'slices';
import history from 'app/history';

export function useGlobalMessageBox()
{
    const dispatch                 = useDispatch();
    const {message, type, routeTo} = useSelector(globalMessageBoxSelector);

    const onClick = () => {
        dispatch(hideGlobalMessageBox());
        if (routeTo)
            history.push(routeTo);
    };

    return {message, type, onClick};
}
