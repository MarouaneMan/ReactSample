import {useEffect, useState} from 'react';

export function useAddToHomeScreenPrompt()
{
    const [prompt, setPrompt] = useState();

    useEffect(() => {
        // Init minimal SW is mendatory to install PWA on android
        if ('serviceWorker' in navigator)
        {
            navigator.serviceWorker
                     .register('sw.js')
                     .then((registration) => {
                         console.log(
                             'Registration successful, scope is:',
                             registration.scope
                         );
                     })
                     .catch((error) => {
                         console.log(
                             'Service worker registration failed, error::',
                             error
                         );
                     });
        }
    }, []);

    const promptToInstall = () => {
        if (prompt)
        {
            return prompt.prompt();
        }

        return Promise.reject(
            console.log('Tried installing before browser sent "beforeinstallprompt" event')
        );
    };

    useEffect(() => {

        const showInstallPromotion = (e) => {
            e.preventDefault();
            setPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', showInstallPromotion);

        return () => {
            window.removeEventListener('beforeinstallprompt', showInstallPromotion);
        };
    }, []);

    return {prompt, promptToInstall};
}
