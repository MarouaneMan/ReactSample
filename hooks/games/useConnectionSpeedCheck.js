import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Authentication} from 'services';

export function useConnectionSpeedCheck()
{
    const {t}                   = useTranslation();
    const [visible, setVisible] = useState(false);
    const protectedCallback     = useRef();

    const protect = (callback) => {
        if (Authentication.GetUserStatus() === 'tester')
        {
            protectedCallback.current = callback;
            return () => setVisible(true);
        }
        else
        {
            return callback;
        }
    };

    const accepted = () => {
        protectedCallback.current();
        setVisible(false);
    };

    const close = () => {
        setVisible(false);
    };

    const propsMessageBox = () => {
        return {
            // specific usage, not localized for now
            message: 'The game service requires a minimum of 30 Mb/s to run smoothly.',
            accept : t('buttons.continue'),
        };
    };


    return {protect, visible, accepted, close, propsMessageBox};
}
