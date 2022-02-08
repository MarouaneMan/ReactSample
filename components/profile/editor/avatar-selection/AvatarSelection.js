import * as S from './AvatarSelection.style';
import {IconArrowLeft, IconArrowRight, NeutralButton, RowLayout} from 'components/ui';
import {Heading} from 'components/profile/editor';
import {Instruction, NavButton} from 'components/profile';
import {SpatialNavSection, useSpatialNavContext} from 'context';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {avatarURL} from 'helpers';
import {useBackPress} from 'hooks';

export function AvatarSelection({avatars, onSelected, onCancel})
{
    const {t}               = useTranslation();
    const {setEnabled}      = useSpatialNavContext();
    const [start, setStart] = useState(0);
    const prevRef           = useRef();
    const nextRef           = useRef();
    const MAX               = 4 * 2;
    const hasPrev           = () => start > 0;
    const hasNext           = () => start + MAX < avatars.length;
    const prev              = () => hasPrev() && setStart(start - MAX);
    const next              = () => hasNext() && setStart(start + MAX);

    useEffect(() => {
        setEnabled(prevRef.current, hasPrev());
        setEnabled(nextRef.current, hasNext());
    }, [start]);

    useBackPress(onCancel);
    return (
        <S.Wrapper>
            <Heading>{t('profile.avatar_selection')}</Heading>
            <Instruction>{t('profile.avatar_selection_text')}</Instruction>
            <RowLayout justifyContent="space-between">
                <NavButton onClick={prev} style={hasPrev() || {opacity: '0.2', pointerEvents: 'none'}} ref={prevRef}>
                    <IconArrowLeft/>
                </NavButton>
                <SpatialNavSection focusOnMount enterTo="last-focused" key={start}>
                    <S.AvatarsGrid>
                        {avatars.slice(start, start + MAX).map((avatar, i) =>
                            <S.AvatarItem key={start + i} src={avatarURL(avatar.file)}
                                          onClick={() => onSelected(avatar)}/>)}
                    </S.AvatarsGrid>
                </SpatialNavSection>
                <NavButton onClick={next} style={hasNext() || {opacity: '0.2', pointerEvents: 'none'}} ref={nextRef}>
                    <IconArrowRight/>
                </NavButton>
            </RowLayout>
            <S.Buttons>
                <NeutralButton onClick={onCancel}>{t('buttons.cancel')}</NeutralButton>
            </S.Buttons>
        </S.Wrapper>
    );
}
