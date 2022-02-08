import * as S from './MessageBox.style';
import {DangerButton, NeutralButton} from 'components/ui/buttons';
import {SpatialNavProvider, SpatialNavSection} from 'context/spatial-nav';
import {IconWarning, RowLayout} from 'components/ui';
import {useTranslation} from 'react-i18next';
import {If} from 'helpers';

export function ConfirmationBox({message, message2, onAccept, onDecline, accept, decline})
{
    const {t} = useTranslation();

    // Note: nested backdrop-filters does not work
    return (
        <SpatialNavProvider>
            <SpatialNavSection focusOnMount>
                <S.Wrapper>
                    <S.BlurredWallpaper/>
                    <S.MessageBox>
                        <If condition={!message2}>
                            <S.MessageWrapper>
                                <S.Icon>
                                    <IconWarning/>
                                </S.Icon>
                                <S.Text>
                                    {message}
                                </S.Text>
                            </S.MessageWrapper>
                        </If>
                        <If condition={message2}>
                            <S.MultipleMessagesWrapper>
                                <S.Icon>
                                    <IconWarning/>
                                </S.Icon>
                                <S.Text>
                                    {message}
                                </S.Text>
                                <S.Text>
                                    {message2}
                                </S.Text>
                            </S.MultipleMessagesWrapper>
                        </If>
                        <RowLayout>
                            <DangerButton style={{marginRight: '1rem'}} onClick={onAccept}
                                          bold>{accept || t('buttons.yes')}</DangerButton>
                            <NeutralButton onClick={onDecline} bold>{decline || t('buttons.cancel')}</NeutralButton>
                        </RowLayout>
                    </S.MessageBox>
                </S.Wrapper>
            </SpatialNavSection>
        </SpatialNavProvider>
    );
}
