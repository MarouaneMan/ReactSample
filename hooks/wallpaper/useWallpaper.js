import {useRef, useState} from 'react';
//for some reasons, needs a minimal bg to transitionned from
import initialBg from 'assets/images/wallpapers/initial_bg.jpg';
import wallpaper1 from 'assets/images/wallpapers/wallpaper_01.jpg';
import wallpaper2 from 'assets/images/wallpapers/wallpaper_02.jpg';
import wallpaper3 from 'assets/images/wallpapers/wallpaper_03.jpg';
import wallpaper4 from 'assets/images/wallpapers/wallpaper_04.jpg';
import wallpaper5 from 'assets/images/wallpapers/wallpaper_05.jpg';
import {preloadImage} from 'helpers';
import {isTV} from 'app/device';
import {useSelector} from 'react-redux';
import {gameSessionSelector, SESSION_STATE} from 'slices';

export function useWallpaper()
{
    const wallpapers                = [wallpaper1, wallpaper2, wallpaper3, wallpaper4, wallpaper5];
    const [wallpaper, setWallpaper] = useState(initialBg);
    const wallpaperInterval         = 2 * 60 * 1000;
    const intervalRef               = useRef();
    const timeoutRef                = useRef();
    const {sessionState}            = useSelector(gameSessionSelector);

    const preloadAndSetWallpaper = (nextWallpaper) => {
        preloadImage(nextWallpaper).then(() => {
            setWallpaper(nextWallpaper);
        });
    };

    const startWallpaperLoop = () => {

        // Disable wallpaper cycling on TV
        if (isTV)
            return;

        // Delay wallpaper change
        timeoutRef.current = setTimeout(() => {
            preloadAndSetWallpaper(wallpaper1);
        }, 1000);

        intervalRef.current = setInterval(setRandomWallpaper, wallpaperInterval);
    };

    const stopWallpaperLoop = () => {
        if (timeoutRef.current)
        {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (intervalRef.current)
        {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const setMainWallpaper = () => {
        stopWallpaperLoop();
        preloadAndSetWallpaper(wallpaper4);
    };

    const setRandomWallpaper = () => {
        // Do nothing when we have a running session
        if (sessionState.id === SESSION_STATE.INITIAL.id)
            preloadAndSetWallpaper(wallpapers[Math.floor(Math.random() * wallpapers.length)]);
    };

    return {wallpaper, setWallpaper, setMainWallpaper, startWallpaperLoop};
}
