import * as S from './BottomButtons.style';
import {BlurButton} from 'components/ui/buttons/blur-button/BlurButton';
import {SupportMessageBox} from '../../support-message-box/SupportMessageBox';
import {If} from 'helpers';
import {useSupportMessageBox} from 'hooks';
import {isMobile} from 'app/device';
import {useTranslation} from 'react-i18next';

export function BottomButtons({registerUrl, supportMethods, supportVisible, setSupportVisible, wrapperToHide, ...props})
{
    const support          = useSupportMessageBox(wrapperToHide);
    const {t}              = useTranslation();
    const onClickNoAccount = () => {
        window.open(registerUrl, '_blank').focus();
    };

    return (
        <S.Wrapper {...props}>
            <If condition={support.visible}>
                <SupportMessageBox onClose={support.hideSupport}
                                   supportMethods={supportMethods}/>
            </If>
            <If condition={isMobile}>
                <span onClick={support.showSupport}>{t('login.support')}</span>
                <span onClick={onClickNoAccount}>{t('login.register_link')}</span>
            </If>
            <If condition={!isMobile}>
                <BlurButton title={t('login.support')} onClick={support.showSupport}/>
                <If condition={registerUrl}>
                    <BlurButton title={t('login.register_link')} onClick={onClickNoAccount}/>
                </If>
            </If>
        </S.Wrapper>
    );
}
