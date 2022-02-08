import ReactDOM from 'react-dom';
import * as S from './WebClient.style';
import {useWebClient} from 'hooks';
import {IconClose2} from 'components/ui';
import {isMobileOrTablet} from 'app/device';
import {resetGameSession} from 'slices';
import {useDispatch} from 'react-redux';

export function WebClient(props)
{
    const containerRef = useWebClient(props);
    const dispatch     = useDispatch();

    const onClose = () => {
        dispatch(resetGameSession());
    };

    return ReactDOM.createPortal(
        <S.Wrapper>
            {isMobileOrTablet && <S.CloseButton>
                <IconClose2 fill="white" onClick={onClose}/>
            </S.CloseButton>}
            <S.Container ref={containerRef}/>
        </S.Wrapper>,
        document.body
    );
}
