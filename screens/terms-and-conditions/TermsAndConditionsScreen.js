import {BlurBox, PrimaryButton, RegularButton, RowLayout} from 'components/ui';
import {TCWrapper, TCText, TCButtons, TCLogo} from 'components/terms-and-conditions';
import {SharedElement} from 'components';
import {useTranslation} from 'react-i18next';
import {useTermsAndConditions} from 'hooks';

export function TermsAndConditionsScreen()
{
    const {t}                               = useTranslation();
    const {title, content, accept, decline} = useTermsAndConditions();

    return (
        <RowLayout alignItems="center" justifyContent="center" fullSize>
            <SharedElement id="box">
                <BlurBox>
                    <TCWrapper>
                        <SharedElement id="logo" zIndex={2} scale>
                            <TCLogo/>
                        </SharedElement>
                        <TCText>
                            <h1>{title}</h1>
                            {content}
                        </TCText>
                        <TCButtons>
                            <PrimaryButton focusOnMount onClick={accept}>{t('buttons.accept')}</PrimaryButton>
                            <RegularButton onClick={decline}>{t('buttons.decline')}</RegularButton>
                        </TCButtons>
                    </TCWrapper>
                </BlurBox>
            </SharedElement>
        </RowLayout>
    );
}
