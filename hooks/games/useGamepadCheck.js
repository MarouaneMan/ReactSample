import {useRef, useState} from 'react';
import {useInputDispatcherContext} from 'context';
import {useTranslation} from 'react-i18next';
import {hasTouch} from 'app/device';

export function useGamepadCheck(game)
{
    const {t}                   = useTranslation();
    const {getNumberOfGamepads} = useInputDispatcherContext();
    const [visible, setVisible] = useState(false);
    const protectedCallback     = useRef();

    const protect = (callback) => {
        if ( getNumberOfGamepads() <= 0                                 // No gamepads detected
            && (                                                        // And
                game.is_gamepad === 'mandatory'                         // Gamepad is mandatory to play
                ||                                                      // Or
                (game.is_virtual_gamepad === 'support' && hasTouch())   // Virtual gamepad is supported and the screen has touch capability
            )
        )
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
        if (game.is_gamepad === 'mandatory' && getNumberOfGamepads() <= 0)
            return;
        protectedCallback.current();
        setVisible(false);
    };

    const close = () => {
        setVisible(false);
    };

    const propsGamepadMessageBox = () => {
        if (game.is_gamepad === 'mandatory')
        {
            return {
                message : t('warnings.gamepad.mandatory'),
                message2: t('warnings.gamepad.connect'),
                accept  : t('buttons.try_again'),
            };
        }
        else if (game.is_virtual_gamepad === 'support')
        {
            return {
                message : t('warnings.gamepad.virtual'),
                message2: t('warnings.gamepad.experience'),
                accept  : t('buttons.continue')
            };
        }
    };


    return {protect, visible, accepted, close, propsGamepadMessageBox};
}
