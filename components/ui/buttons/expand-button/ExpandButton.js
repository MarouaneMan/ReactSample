import * as S from './ExpandButton.style';

export function ExpandButton({onClick, ...props})
{

    return (
        <S.Wrapper onClick={() => onClick()} {...props}>
            <S.Dot />
            <S.Dot />
            <S.Dot />
        </S.Wrapper>
    );
}
