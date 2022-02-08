import store from 'app/store';
import {hideGlobalLoader, showGlobalLoader} from 'slices';

export function withGlobalLoader(promise)
{
    return new Promise((resolve, reject) => {

        // Show Loader
        store.dispatch(showGlobalLoader());

        promise
            .then(val => {
                resolve(val);
            })
            .catch(err => {
                reject(err);
            })
            .finally(() => {

                // Hide Loader
                store.dispatch(hideGlobalLoader());
            });
    });
}
