import {SpatialNavSection} from 'context';
import {DangerButton, LoadingButton, NeutralButton, PrimaryButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import {Buttons} from './Buttons';

export function UpdateButtons({callbacks, state})
{
    const {t} = useTranslation();

    return (
        <SpatialNavSection enterTo="default-element">
            <Buttons count={3}>
                <LoadingButton defaultElement onClick={callbacks.onUpdate} isLoading={state.isWorking}
                               button={PrimaryButton}>
                    {t('buttons.edit')}
                </LoadingButton>
                <NeutralButton onClick={callbacks.onCancel}>{t('buttons.cancel')}</NeutralButton>
                <LoadingButton onClick={() => callbacks.onDeleteConfirmation(true)} isLoading={state.isDeleting}
                               loadingText={t('profile.deleting')}
                               button={DangerButton}>
                    {t('buttons.delete')}
                </LoadingButton>
            </Buttons>
        </SpatialNavSection>
    );
}
