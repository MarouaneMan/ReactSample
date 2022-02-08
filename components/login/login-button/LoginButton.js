import * as S from './LoginButton.style';
import {LoadingButton, PrimaryButton} from 'components/ui';
import {useTranslation} from 'react-i18next';

export function LoginButton({isChecking, ...props})
{
    const {t} = useTranslation();

    return (
        <S.Wrapper>
            <LoadingButton isLoading={isChecking} button={PrimaryButton}
                           loadingText={t('login.checking')}
                           bold {...props}>
                {t('login.login')}
            </LoadingButton>
        </S.Wrapper>
    );
}
