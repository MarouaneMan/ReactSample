import * as S from './MoreView.style';
import {RowLayout} from 'components/ui';
import {GameCopyright, GameItem} from 'components/games';
import {ActionButtons} from './action-buttons/ActionButtons';
import {If} from 'helpers';
import {isMobile} from 'app/device';
import * as View from '../View.style';

export function MoreView({game})
{
    return (
        <RowLayout fullSize>
            <View.LeftPan>
                <GameItem game={game} src={game.assets.cover}/>
                <If condition={isMobile}>
                    <ActionButtons game={game}/>
                </If>
            </View.LeftPan>
            <View.RightPan>
                <S.Content>
                    <GameCopyright game={game}/>
                    <If condition={!isMobile}>
                        <ActionButtons game={game}/>
                    </If>
                </S.Content>
            </View.RightPan>
        </RowLayout>
    );
}
