import * as S from './ProfileLock.style';
import {useTranslation} from 'react-i18next';
import {Checkbox, PinCode} from 'components/ui';
import {SpatialNavSection} from 'context';
import React from 'react';

export const ProfileLock = React.forwardRef(({onLockChange, onPinChange, locked, defaultPIN}, forwardedRef) => {

    const {t} = useTranslation();

    return (
        <SpatialNavSection enterTo="default-element" id="profile-lock">
            <S.Wrapper>
                <S.Row>
                    <S.Text>{t('profile.profile_lock')}</S.Text>
                    <S.LockCheckbox onClick={e => {
                        if (e.target === e.currentTarget)
                        {
                            e.currentTarget.firstChild.click();
                            e.currentTarget.focus();
                        }
                    }}>
                        <Checkbox onChange={onLockChange} defaultChecked={locked}/>
                    </S.LockCheckbox>
                </S.Row>
                <S.Row style={locked || {opacity: '0.35', filter: 'saturate(0)', pointerEvents: 'none'}}>
                    <S.Text>{t('profile.pin_code')}</S.Text>
                    <S.PinCodeWrapper>
                        <PinCode ref={forwardedRef} style={{width: '100%', height: '100%'}}
                                 enabled={locked} defaultValue={defaultPIN}
                                 onChange={onPinChange}/>
                    </S.PinCodeWrapper>
                </S.Row>
            </S.Wrapper>
        </SpatialNavSection>
    );
});
