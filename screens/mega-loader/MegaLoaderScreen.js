import {RowLayout, BlurBox, Logo} from 'components/ui';
import {MegaLoaderWrapper, MegaProgressBar} from 'components/mega-loader';
import {SharedElement} from 'components';
import {useMegaLoader} from 'hooks';

export function MegaLoaderScreen()
{
    const {progress, onProgressComplete, startLoading} = useMegaLoader();

    return (
        <RowLayout alignItems="center" justifyContent="center" fullSize>
            <SharedElement id="box">
                <BlurBox>
                    <MegaLoaderWrapper>
                        <SharedElement id="logo" zIndex={2} scale>
                            <Logo/>
                        </SharedElement>
                        <MegaProgressBar onVisible={startLoading} progress={progress} onProgressComplete={onProgressComplete}/>
                    </MegaLoaderWrapper>
                </BlurBox>
            </SharedElement>
        </RowLayout>
    );
}
