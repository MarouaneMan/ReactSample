import * as S from './MessageBox.style';
import {IconSuccess, IconWarning} from 'components/ui/icons';
import {DangerButton, PrimaryButton} from 'components/ui/buttons';
import {SpatialNavProvider, SpatialNavSection} from 'context/spatial-nav';

export function MessageBox({message, onClick, type})
{
    const Type = {
        'error'  : {
            Button: DangerButton,
            Icon  : IconWarning,
        },
        'success': {
            Button: PrimaryButton,
            Icon  : IconSuccess,
        },
        'info'   : {
            Button: PrimaryButton,
            Icon  : null,
        }
    }[type];

    // Note: nested backdrop-filters does not work
    return (
        <SpatialNavProvider>
            <SpatialNavSection focusOnMount>
                <S.Wrapper>
                    <S.BlurredWallpaper/>
                    <S.MessageBox>
                        <S.MessageWrapper>
                            {Type.Icon &&
                            <S.Icon>
                                <Type.Icon/>
                            </S.Icon>}
                            <S.Text>
                                {message}
                            </S.Text>
                        </S.MessageWrapper>
                        <Type.Button onClick={onClick} bold>Ok</Type.Button>
                    </S.MessageBox>
                </S.Wrapper>
            </SpatialNavSection>
        </SpatialNavProvider>
    );
}
