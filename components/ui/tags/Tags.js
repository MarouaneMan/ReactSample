import * as S from './Tags.style';

export function Tags({isNew, is4K})
{
    const renderTags = () => {

        if (isNew && is4K)
        {
            return (
                <>
                    <S.Tag color="orange">new</S.Tag>
                    <S.Tag color="purple">4K</S.Tag>
                </>
            );
        }

        if (isNew)
            return <S.Tag color="orange">new</S.Tag>;

        if (is4K)
            return <S.Tag color="purple">4K</S.Tag>;
    };

    return (
        <S.TagsWrapper>
            {renderTags()}
        </S.TagsWrapper>
    );
}
