import * as S from './Eula.style';
import {SpatialNavProvider} from 'context';
import {useDownPress, useUpPress} from 'hooks';
import {LoadingButton, PrimaryButton, RegularButton} from 'components/ui';
import {useTranslation} from 'react-i18next';
import {useEula} from 'hooks';
import {useRef} from 'react';
import {If} from 'helpers';

export function Eula({game, onClose, onApproved, readOnly})
{
    const ref                                          = useRef();
    const {t}                                          = useTranslation();
    const {isLoading, isApproving, onAccept, eulaText} = useEula({
        game      : game,
        onError   : onClose,
        onApproved: onApproved
    });

    useUpPress(() => ref.current.scrollTop -= 60);
    useDownPress(() => ref.current.scrollTop += 60);

    return (
        <SpatialNavProvider>
            <S.Wrapper>
                <S.Box>
                    <If condition={isLoading}>
                        <S.Spinner/>
                    </If>

                    <If condition={!isLoading}>
                        <S.Text ref={ref}>
                            <h1>{game.name}</h1>
                            <S.FormatEula>{eulaText}</S.FormatEula>
                        </S.Text>
                        <S.Buttons>
                            <If condition={readOnly}>
                                <PrimaryButton focusOnMount onClick={onClose}>{t('buttons.ok')}</PrimaryButton>
                            </If>
                            <If condition={!readOnly}>
                                <LoadingButton isLoading={isApproving}
                                               focusOnMount
                                               button={PrimaryButton}
                                               loadingText={t('eula.approving')}
                                               onClick={onAccept}>
                                    {t('buttons.accept')}
                                </LoadingButton>
                                <RegularButton onClick={onClose}>{t('buttons.decline')}</RegularButton>
                            </If>
                        </S.Buttons>
                    </If>
                </S.Box>
            </S.Wrapper>
        </SpatialNavProvider>
    );
}
