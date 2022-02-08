import React, {useContext, useRef, useState} from 'react';

const Context = React.createContext(null);

export const useMultiViewContext = () => useContext(Context);

export function MultiView({children, defaultView})
{
    const [view, setCurrentView] = useState(defaultView);
    const viewRenderCount        = useRef({[defaultView] : 1});

    const setView = (view) => {
        if (!viewRenderCount.current[view])
            viewRenderCount.current[view] = 1;
        else
            viewRenderCount.current[view]++;
        setCurrentView(view);
    };

    return (
        <Context.Provider value={{view, setView, viewRenderCount}}>
            {children}
        </Context.Provider>
    );
}
