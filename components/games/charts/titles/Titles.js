import {useTranslation} from 'react-i18next';
import * as S from './Titles.style';

export function Titles({colsTitles})
{
    const {t} = useTranslation();

    return (
        <S.Wrapper>
            {colsTitles.map((title, index) =>
                <S.TitleWrapper key={index}>
                    <S.PreTitle>{t('charts.top_10')}</S.PreTitle>
                    <S.Title>{title}</S.Title>
                </S.TitleWrapper>
            )}
        </S.Wrapper>
    );
}
