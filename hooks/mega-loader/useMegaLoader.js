import {useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {FrontEndHelper, Games, Profile, TermsAndConditions} from 'services';
import {doLogout, setEulaApprovedGames, setInitialProfiles} from 'slices';
import Routes from 'app/routes';
import {useDispatch} from 'react-redux';

export function useMegaLoader()
{
    const [progress, setProgress]             = useState(0);
    const [loadingStarted, setLoadingStarted] = useState(false);
    const history                             = useHistory();
    const dispatch                            = useDispatch();

    const StartPreloading = () => {

        let optionalPromises = [];

        waitCriticalPromises([

            // Preload FrontEndHelper Service
            FrontEndHelper.Preload(optionalPromises),

            // Preload Profiles
            Profile.Preload(profiles => dispatch(setInitialProfiles(profiles))),

            // Preload Games
            Games.Preload(optionalPromises, (approvedGames) => dispatch(setEulaApprovedGames(approvedGames)))

        ], optionalPromises);
    };

    // Critical promises, these are basically http requests (get_apps...)
    // For any fail, we route the user to the LoginScreen
    const waitCriticalPromises = (criticalPromises, optionalPromises) => {

        let aborted   = false;
        let completed = 0;

        criticalPromises.forEach(promise => {

            promise.then(() => {

                if (aborted) return;

                ++completed;

                // Update progress
                let progress = (completed / criticalPromises.length) * (criticalPromises.length * 10);
                setProgress(progress);

                // Critical promises completed, wait optional promises
                if (completed === criticalPromises.length)
                    waitOptionalPromises(optionalPromises, progress);

            }).catch(err => {

                console.error(err); // Critical
                if (!aborted)
                {
                    aborted = true;
                    dispatch(doLogout()).then(() => {
                        history.push(Routes.LOGIN);
                    });
                }
            });
        });
    };

    // Optional promises, mainly images preload
    const waitOptionalPromises = (optionalPromises, criticalPromisesProgress) => {

        // Wait all promises to resolve/reject
        let completed = 0;
        optionalPromises.forEach(promise => {

            promise.finally(() => {

                // Increment completed promises
                ++completed;

                // All resolved/rejected, redirect to terms and conditions
                if (completed === optionalPromises.length)
                    setProgress(100);
                else
                {
                    // Increment progress
                    let progress = (completed / optionalPromises.length) * (100 - criticalPromisesProgress);
                    setProgress(criticalPromisesProgress + progress);
                }
            }).catch(e => console.error(e));
        });
    };


    useEffect(() => {

        // preloading starts after animation end
        if (loadingStarted)
            StartPreloading();

    }, [loadingStarted]);

    const onProgressComplete = useCallback(() => {
        // Route to profile selection if already signed
        if (TermsAndConditions.Signed())
            history.push(Routes.PROFILE_SELECTION);
        else
            history.push(Routes.TERMS_AND_CONDITIONS);
    }, []);

    const startLoading = useCallback(() => {
        setLoadingStarted(true);
    }, []);

    return {progress, onProgressComplete, startLoading};
}
