import {IconButton, IconTrailer, NeutralButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import ReactDOM from 'react-dom';
import {If} from 'helpers';
import {Trailer} from './Trailer';
import {useState} from 'react';

export function TrailerButton({game, ...props})
{
    const {t}                   = useTranslation();
    const [visible, setVisible] = useState(false);

    return (
        <>
            <If condition={visible}>
                {ReactDOM.createPortal(
                    <Trailer game={game}
                             onClose={() => setVisible(false)}
                    />,
                    document.body)}
            </If>
            <IconButton button={NeutralButton} icon={IconTrailer} onClick={() => setVisible(true)} {...props}>
                {t('buttons.trailer')}
            </IconButton>
        </>
    );
}
