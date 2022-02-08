import * as S from './LangSelection.style';
import {LangIcon} from 'components/ui';
import {SpatialNavProvider, SpatialNavSection} from 'context';
import {useLanguageSelect} from 'hooks/login';
import {useBackPress} from 'hooks';
import {languages} from 'i18n';

export function LangSelection(props)
{
    const {lang, changeLanguage} = useLanguageSelect();

    // On Back button pressed
    useBackPress(() => changeLanguage(lang));

    return (
        <SpatialNavProvider>
            <SpatialNavSection enterTo="default-element" focusOnMount>
                <S.LangSelectionWrapper {...props}>
                    {languages.map((language, idx) =>
                        <LangIcon defaultElement={language === lang}
                                  key={idx} lang={language}
                                  onClick={() => changeLanguage(language)}
                        />
                    )}
                </S.LangSelectionWrapper>
            </SpatialNavSection>
        </SpatialNavProvider>
    );
}
