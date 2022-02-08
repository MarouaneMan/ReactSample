import * as S from './NavButtons.style';
import {IconArrowLeft, IconArrowRight} from 'components/ui';
import {If} from 'helpers';
import {isTV} from 'app/device';
import {useBackPress} from 'hooks';
import {SpatialNavSection} from 'context';

export function NavButtons({onClose, onNext, onPrev, index, indexMax})
{
    useBackPress(onClose);

    return (
        <SpatialNavSection enterTo="default-element">
            <S.Wrapper>
                <If condition={!isTV}>
                    <S.Icon onClick={onClose} disableMoveRight={true}>
                        <S.IconClose/>
                    </S.Icon>
                </If>

                <S.Icon defaultElement onClick={onNext}
                        disableMoveRight={true}
                        style={index !== indexMax || {opacity: '0.35', filter: 'saturate(0)', pointerEvents: 'none'}}>
                    <IconArrowRight fill="white"/>
                </S.Icon>

                <S.Icon onClick={onPrev} disableMoveRight={true} style={index !== 0 || {opacity: '0.35', filter: 'saturate(0)', pointerEvents: 'none'}}>
                    <IconArrowLeft fill="white"/>
                </S.Icon>
            </S.Wrapper>
        </SpatialNavSection>
    );
}
