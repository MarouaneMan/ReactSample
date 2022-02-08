import {useEffect, useState} from 'react';
import * as S from './GlobalPwaInstructions.style';
import {useTranslation} from 'react-i18next';
import {If} from 'helpers';
import {DownloadAndroid} from './android/DownloadAndroid';
import {DownloadIos} from './ios/DownloadIos';
import {isAndroid, isIOS, isStandalone} from 'app/device';
import {useAddToHomeScreenPrompt} from 'hooks';
import {IconRotate} from 'components/ui';

export function GlobalPwaInstructions({debug})
{
    const {t}                                                 = useTranslation();
    const {prompt, promptToInstall}                           = useAddToHomeScreenPrompt();
    const [showAndroidDownloadBtn, setShowAndroidDownloadBtn] = useState(false);

    useEffect(() => {
        if (prompt)
            setShowAndroidDownloadBtn(true);
    }, [prompt]);

    if (!isStandalone())
    {
        return (
            <If condition={!debug}>
                <S.InstructionsWrapper>
                    <S.Box>
                        <S.LogoWrapper>
                            <S.FakeIcon/>
                            <S.FakeIcon/>
                            <S.LogoIcon/>
                            <S.FakeIcon/>
                            <S.FakeIcon/>
                        </S.LogoWrapper>
                        <S.TextWrapper>
                            <S.InstallTitle>
                                {t('pwa.install')}
                            </S.InstallTitle>
                            <S.InstallText>
                                <If condition={isIOS || isAndroid}>
                                    {t('pwa.install_description')}
                                </If>
                                <If condition={!isIOS && !isAndroid}>
                                    {t('pwa.install_unavailable')}
                                </If>
                            </S.InstallText>
                        </S.TextWrapper>
                        <If condition={isAndroid && showAndroidDownloadBtn}>
                            <DownloadAndroid onClick={promptToInstall}/>
                        </If>
                        <If condition={isIOS}>
                            <DownloadIos/>
                        </If>
                    </S.Box>
                </S.InstructionsWrapper>
            </If>
        );
    }
    else
    {
        return (
            <S.InstructionsWrapperLandscape>
                <S.RotateYourPhone>
                    <S.RotateText>{t('pwa.rotate')}</S.RotateText>
                    <S.SvgWrapper>
                        <IconRotate/>
                    </S.SvgWrapper>
                </S.RotateYourPhone>
            </S.InstructionsWrapperLandscape>
        );
    }
}


