import {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {eulaSelector} from 'slices';

export function useEulaVerification(game)
{
    const {approvedGames}       = useSelector(eulaSelector);
    const [visible, setVisible] = useState(false);
    const protectedCallback     = useRef();

    const protect = (callback) => {
        // Check if we need to agree eula first
        if (game.has_eula && approvedGames.includes(game.alias) === false)
        {
            protectedCallback.current = callback;
            return () => setVisible(true);
        }
        return callback;
    };

    const accepted = () => {
        protectedCallback.current();
        setVisible(false);
    };

    const close = () => {
        setVisible(false);
    };

    return {
        protect,
        visible,
        accepted,
        close
    };
}
