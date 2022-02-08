import {useDispatch, useSelector} from 'react-redux';
import {changeLoginLanguage, loginSelector, showLanguageSelection} from 'slices';
import {useEffect} from 'react';
import i18n from 'i18n';

export function useLanguageSelect()
{
    const {lang, langSelectVisible} = useSelector(loginSelector);
    const dispatch                  = useDispatch();

    // Watch language change
    useEffect(() => {
        if (lang !== i18n.language)
        {
            i18n.changeLanguage(lang).then(() => {
                console.debug('Language changed to', lang);
            });
        }
    }, [lang]);

    // Show language selector
    const showLangSelect = () => {
        dispatch(showLanguageSelection());
    };

    // Change language
    const changeLanguage = (newLanguage) => {
        dispatch(changeLoginLanguage(newLanguage));
    };

    return {lang, langSelectVisible, showLangSelect, changeLanguage};
}
