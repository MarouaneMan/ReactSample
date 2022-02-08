import {SpatialNavSection} from 'context';
import {LoadingButton, NeutralButton, PrimaryButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import {Buttons} from './Buttons';

export function CreateButtons({callbacks, state})
{
    const {t} = useTranslation();

    return (
        <SpatialNavSection enterTo="default-element">
            <Buttons count={2}>
                <LoadingButton defaultElement onClick={callbacks.onCreate} isLoading={state.isWorking}
                               loadingText={t('profile.working')}
                               button={PrimaryButton}>
                    {t('buttons.create')}
                </LoadingButton>
                <NeutralButton onClick={callbacks.onCancel}>{t('buttons.cancel')}</NeutralButton>
            </Buttons>
        </SpatialNavSection>
    );
}
