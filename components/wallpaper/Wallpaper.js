import {useRef} from 'react';
import * as S from './Wallpaper.style';
import {useParallax} from 'hooks/parallax/useParallax';

export function Wallpaper()
{
    const ref = useRef();

    useParallax(ref, 0.25);

    return (
        <S.Wallpaper ref={ref}/>
    );
}
