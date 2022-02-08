import {RegularButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import ReactDOM from 'react-dom';
import {If} from 'helpers';
import {useState} from 'react';
import {Eula} from './Eula';

export function EulaButton({game})
{
    const {t}                   = useTranslation();
    const [visible, setVisible] = useState(false);

    return (
        <>
            <If condition={visible}>
                {ReactDOM.createPortal(
                    <Eula game={game}
                          readOnly={true}
                          onClose={() => setVisible(false)}/>,
                    document.body)}
            </If>
            <If condition={game.has_eula}>
                <RegularButton onClick={() => setVisible(true)}>{t('buttons.eula')}</RegularButton>
            </If>
        </>
    );
}
