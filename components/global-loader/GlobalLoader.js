import * as S from './GlobalLoader.style';
import {useSelector} from 'react-redux';
import {globalLoaderSelector} from 'slices';
import {If} from 'helpers';

export function GlobalLoader()
{
    const {visible} = useSelector(globalLoaderSelector);
    return (
        <If condition={visible}>
            <S.Wrapper>
                <S.Spinner/>
            </S.Wrapper>
        </If>
    );
}
