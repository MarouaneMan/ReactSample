import {useState, useEffect} from 'react';
import * as S from './ConfirmationButton.style';
import {If} from 'helpers';

export function ConfirmationButton(props)
{
    const [isConfirm, setIsConfirm]         = useState(false);
    const [currentStatus, setCurrentStatus] = useState(props.status1);
    const [currentText, setCurrentText]     = useState();

    useEffect(() => {
        setCurrentText(currentStatus);
    }, []);

    const handleClick = (e) => {
        props.handleConfirm();

        if (currentStatus === props.status1)
            setCurrentText(props.status2);

        if (currentStatus === props.status2)
            setCurrentText(props.status1);
    };

    return (
        <S.ConfirmationButton onClick={handleClick} onMouseEnter={() => setIsConfirm(true)} onMouseLeave={() => setIsConfirm(false)}>
            <If condition={isConfirm}>
                {props.confirm}
            </If>
            <If condition={!isConfirm}>
                {currentStatus}
            </If>
        </S.ConfirmationButton>
    );
}
