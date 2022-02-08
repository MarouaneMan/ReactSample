import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import main_en from './locales/en/main.json';
import main_fr from './locales/fr/main.json';
import main_de from './locales/de/main.json';
import main_it from './locales/it/main.json';

// Keep language order
//export const languages = ['en', 'fr', 'de', 'it'];
export const languages = ['en', 'fr'];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng  : 'en',
        debug        : process.env.NODE_ENV === 'development',
        defaultNS    : 'main',
        supportedLngs: languages,
        resources    : {
            en: {
                main: main_en
            },
            fr: {
                main: main_fr
            },
            de: {
                main: main_de
            },
            it: {
                main: main_it
            }
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });


export default i18n;
