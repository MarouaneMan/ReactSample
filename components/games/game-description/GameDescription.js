import * as S from './GameDescription.style';
import {GameHeading} from 'components/games';
//May need to replace react-dotdotdot with react-truncate https://www.npmjs.com/package/react-truncate
import Dotdotdot from 'react-dotdotdot';
import {If} from 'helpers';
import {ExpandButton} from 'components/ui/buttons';
import {isMobile} from 'app/device';

export function GameDescription({game, minimized, onExpandClicked})
{
    return (
        <S.Wrapper>
            <GameHeading game={game}/>

            <If condition={minimized}>
                <S.DescriptionWrapperMinimized>
                    <Dotdotdot clamp={isMobile ? 2 : 3} truncationChar="&nbsp;">
                        {game.assets.description}
                    </Dotdotdot>
                    <S.ExpandWrapper>
                        <ExpandButton disableMoveRight={true} onClick={() => onExpandClicked(game.index)}/>
                    </S.ExpandWrapper>
                </S.DescriptionWrapperMinimized>
            </If>

            <If condition={!minimized}>
                <S.DescriptionWrapper>
                    <S.Description>
                        {game.assets.description}
                    </S.Description>
                </S.DescriptionWrapper>
            </If>
        </S.Wrapper>
    );
}
