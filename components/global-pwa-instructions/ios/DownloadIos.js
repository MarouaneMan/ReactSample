import {IconShare} from 'components/ui/icons';
import {useTranslation} from 'react-i18next';
import * as S from './DownloadIos.style';

export function DownloadIos()
{
    const {t} = useTranslation();

    return (
        <S.IosInstructions>
            <span>{t('pwa.just_tap')}</span> <span><IconShare width="30" height="30"/></span> <span> {t('pwa.a2hs')}</span>
        </S.IosInstructions>
    );
}
