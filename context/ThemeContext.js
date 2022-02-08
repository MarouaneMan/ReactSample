import {useContext} from 'react';
import {ThemeProvider as StyledThemeProvider, ThemeContext} from 'styled-components';
import {useWallpaper} from 'hooks';
import {Wallpaper} from 'components/wallpaper/Wallpaper';

export const useThemeContext = () => useContext(ThemeContext);

export function ThemeProvider({children})
{

    const {wallpaper, setMainWallpaper, startWallpaperLoop} = useWallpaper();

    return (
        <StyledThemeProvider value={{wallpaper, setMainWallpaper, startWallpaperLoop}}>
            <Wallpaper/>
            {children}
        </StyledThemeProvider>
    );
}
