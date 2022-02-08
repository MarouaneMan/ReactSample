import * as S from './WelcomeTexte.style';
import {useTranslation} from 'react-i18next';

export const WelcomeText = () => {
    const {t} = useTranslation();

    return (
        <S.WelcomeTextWrapper>
            <S.WelcomeText>{t('login.welcome')}</S.WelcomeText>
            <S.AccountText>{t('login.account')}</S.AccountText>
        </S.WelcomeTextWrapper>
    );
};
