import React, {useContext, useState} from 'react';

const Context = React.createContext(null);

export const useMultiStepContext = () => useContext(Context);

export function MultiStep({children, defaultStep})
{
    const [step, setStep] = useState(defaultStep);

    return (
        <Context.Provider value={{step, setStep}}>
            {children}
        </Context.Provider>
    );
}
