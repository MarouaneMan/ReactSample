import {useSpatialNav} from 'hooks';
import React from 'react';

// Focusable Helper
export const withFocusable = function (Component) {

    return React.forwardRef(({
                                 children,
                                 overrideMoveLeft,
                                 overrideMoveRight,
                                 overrideMoveUp,
                                 overrideMoveDown,
                                 disableMoveLeft,
                                 disableMoveRight,
                                 disableMoveUp,
                                 disableMoveDown,
                                 animatable,
                                 focusOnMount,
                                 defaultElement,
                                 ...props
                             }, forwardedRef) => {

        const {ref} = useSpatialNav({
                overrideMoveLeft,
                overrideMoveRight,
                overrideMoveUp,
                overrideMoveDown,
                disableMoveLeft,
                disableMoveRight,
                disableMoveUp,
                disableMoveDown,
                animatable,
                focusOnMount,
                defaultElement,
            },
            typeof forwardedRef !== 'function' && forwardedRef);
        return (
            <Component ref={(e) => {
                if (typeof forwardedRef == 'function')
                    forwardedRef(e);
                ref.current = e;
            }} {...props}>
                {children}
            </Component>
        );
    });
};


