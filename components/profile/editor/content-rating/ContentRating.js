import React from 'react';
import * as S from './ContentRating.style';
import {useTranslation} from 'react-i18next';
import {ContentRatingSelector} from './ContentRatingSelector';
import {SpatialNavSection} from 'context';
import {FrontEndHelper} from 'services';

export const ContentRating = React.forwardRef(({defaultValue, onChange}, forwardedRef) => {

    const {t}                = useTranslation();
    const contentRatingArray = FrontEndHelper.GetContentRating();

    return (
        <SpatialNavSection enterTo="last-focused">
            <S.Wrapper>
                <S.Text>{t('profile.content_rating_text')}</S.Text>
                <ContentRatingSelector ref={forwardedRef} defaultValue={defaultValue} onChange={onChange}
                                       contentRatingArray={contentRatingArray}/>
            </S.Wrapper>
        </SpatialNavSection>
    );
});
