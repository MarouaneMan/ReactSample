import {RowLayout} from 'components/ui';
import {GameItem} from 'components/games';
import {ActionButtons} from './action-buttons/ActionButtons';
import {If} from 'helpers';
import {isMobile} from 'app/device';
import * as View from '../View.style';
import * as S from './QuickMatchView.style';
import {Lobby} from './lobby/Lobby';

export function QuickMatchView({game})
{
    return(
        <RowLayout fullSize>

            <View.LeftPan>
                <GameItem game={game} src={game.assets.cover}/>
                <If condition={isMobile}>
                    <ActionButtons game={game}/>
                </If>
            </View.LeftPan>

            <View.RightPan>
                <S.Content>
                    <Lobby game={game} />
                    <If condition={!isMobile}>
                        <ActionButtons game={game}/>
                    </If>
                </S.Content>
            </View.RightPan>
        </RowLayout>
    );
}
