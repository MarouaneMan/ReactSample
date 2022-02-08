import * as S from './DownloadAndroid.style';
import {useTranslation} from 'react-i18next';

export function DownloadAndroid({onClick})
{

    const {t} = useTranslation();

    return (
        <S.DownloadAndroid onClick={onClick}>
            <div>{t('pwa.download_android')}</div>
        </S.DownloadAndroid>
    );
}
