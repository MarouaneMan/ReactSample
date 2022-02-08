import * as S from './ForgotPassword.style';
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from 'react-router-dom';
import Routes from 'app/routes';
import {useDispatch} from 'react-redux';
import {doLogout} from 'slices';

export function ForgotPassword(props)
{
    const {t}      = useTranslation();
    const history  = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const onClick = () => dispatch(doLogout()).then(() => {
        // store current location so we can go back to it on cancel
        // see account-recovery/ActionButtons
        history.push(Routes.ACCOUNT_RECOVERY, {from: location.pathname});
    });

    return (
        <S.Text onClick={onClick} {...props}>
            {t('login.forget_password')}
        </S.Text>
    );
}
