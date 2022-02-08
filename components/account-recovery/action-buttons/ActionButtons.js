import * as S from './ActionButtons.style';
import {NeutralButton, PrimaryButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {resetSteps} from 'slices';
import {SpatialNavSection} from 'context';

export function ActionButtons({onSubmit})
{
    const dispatch = useDispatch();
    const {t}      = useTranslation();
    const history  = useHistory();
    const location = useLocation();

    const onCancelButton = () => {
        dispatch(resetSteps());
        // go back to previous screen, or root if none specified
        // see ForgotPassword
        history.push(location.state?.from || '/');
    };

    return (
        <SpatialNavSection enterTo="default-element">
            <S.ButtonsWrapper>
                <PrimaryButton defaultElement onClick={onSubmit}>
                    {t('buttons.ok')}
                </PrimaryButton>
                <NeutralButton onClick={onCancelButton}>{t('buttons.cancel')}</NeutralButton>
            </S.ButtonsWrapper>
        </SpatialNavSection>
    );
}
