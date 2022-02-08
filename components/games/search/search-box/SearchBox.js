import * as S from './SearchBox.style';
import {useTranslation} from 'react-i18next';
import {Input, NeutralButton} from 'components/ui';
import {useEffect, useRef} from 'react';
import {SpatialNavSection} from 'context';

export function SearchBox({onSearch, currentCue, onMoveDown})
{
    const {t} = useTranslation();
    const ref = useRef();

    useEffect(() => {
        // We cannot use currentCue as a prop on <Input /> cause we need
        // to set an onChange handler that we dont want
        ref.current.value = currentCue;
    }, [currentCue])

    const onInputKeyDown = (e) => {
        if(e.keyCode === 13)
            onSearch(ref.current.value)
    }

    return (
        <SpatialNavSection>
            <S.Wrapper>
                <S.InputWrapper>
                    <Input ref={ref} onKeyDown={onInputKeyDown} overrideMoveDown={onMoveDown} name="username" placeholder={t('search.placeholder')}/>
                </S.InputWrapper>
                <S.ButtonWrapper>
                    <NeutralButton overrideMoveDown={onMoveDown} onClick={() => onSearch(ref.current.value)}>{t('buttons.search')}</NeutralButton>
                </S.ButtonWrapper>
            </S.Wrapper>
        </SpatialNavSection>
    );
}
