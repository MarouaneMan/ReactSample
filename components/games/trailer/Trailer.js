import * as S from './Trailer.style';
import {SpatialNavProvider} from 'context';
import {useTrailer} from 'hooks';
import {If, trailerURL} from 'helpers';
import {IconClose2} from 'components/ui';
import {isTV} from 'app/device';

export function Trailer({game, onClose})
{
    const {videoRef, sourceRef} = useTrailer(onClose);

    return (
        <SpatialNavProvider>
            <S.Wrapper>
                <S.VideoWrapper>
                    <If condition={!isTV}>
                        <S.Close focusOnMount onClick={onClose}>
                            <IconClose2 fill="white"/>
                        </S.Close>
                    </If>
                    <S.Video ref={videoRef} controls onClick={e => e.preventDefault()}>
                        <source ref={sourceRef} type="video/mp4" src={trailerURL(game.assets.trailer)}/>
                    </S.Video>
                </S.VideoWrapper>
            </S.Wrapper>
        </SpatialNavProvider>
    );
}
