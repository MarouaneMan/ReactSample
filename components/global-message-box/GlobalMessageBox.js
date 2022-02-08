import {MessageBox} from 'components/ui';
import {useGlobalMessageBox} from 'hooks';
import {If} from 'helpers';

export function GlobalMessageBox()
{
    const {message, type, onClick} = useGlobalMessageBox();

    return (
        <If condition={message}>
            <MessageBox message={message} type={type} onClick={onClick}/>
        </If>
    );
}
