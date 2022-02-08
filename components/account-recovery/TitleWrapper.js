import * as S from './RecoveryStep.style';

export function TitleWrapper({error, title})
{

    return (
        <S.TitleWrapper
            className={error && ((Object.keys(error).length === 0 && error.constructor === Object) === false) ? 'disabled' : ''}>
            {title}
        </S.TitleWrapper>
    );
}
