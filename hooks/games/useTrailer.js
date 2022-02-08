import {useEffect, useRef} from 'react';
import {isTV} from '../../app/device';
import {useBackPress} from '../input-dispatch';

export function useTrailer(onClose)
{
    const videoRef  = useRef();
    const sourceRef = useRef();

    useBackPress(onClose);

    useEffect(() => {

        // Disable controls on TV
        if (isTV)
            videoRef.current.controls = false;

        // autoplay attribute not working, doing it manually
        videoRef.current.play().catch(err => {
            console.error(err);
            onClose();
        });

        // Video end
        videoRef.current.addEventListener('ended', () => {
            onClose();
        });

        // Source error
        sourceRef.current.addEventListener('error', (err) => {
            console.error(err);
            onClose();
        });
    }, []);

    return {videoRef, sourceRef};
}
