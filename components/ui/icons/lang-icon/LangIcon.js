import * as S from './LangIcon.style';
import {useTranslation} from 'react-i18next';

// Get icons from : https://www.flaticon.com/fr/packs/square-country-simple-flags
// Note : don't use SVG => border aliasing problem
import FrIcon from 'assets/images/language/fr.png';
import EnIcon from 'assets/images/language/en.png';
import DeIcon from 'assets/images/language/de.png';
import ItIcon from 'assets/images/language/it.png';

export function LangIcon({lang, ...props})
{
    const {t} = useTranslation();

    const icons = {
        'fr': FrIcon,
        'en': EnIcon,
        'de': DeIcon,
        'it': ItIcon,
    };

    return <S.LangIcon {...props} src={icons[lang]} alt={t(`languages.${lang}`)}/>;
}
