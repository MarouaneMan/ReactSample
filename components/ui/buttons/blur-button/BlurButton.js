import * as S from './BlurButton.style';
import {BlurBox} from 'components/ui/blur-box';

export function BlurButton({title, ...props}) {
    return (
        <S.FocusableWrapper {...props}>
            <BlurBox>
                <S.ButtonWrapper title={title}>{title}</S.ButtonWrapper>
            </BlurBox>
        </S.FocusableWrapper>
    )
}
