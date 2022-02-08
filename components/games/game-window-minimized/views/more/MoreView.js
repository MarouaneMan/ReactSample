import * as S from './MoreView.style';
import {RowLayout} from 'components/ui';
import {GameCopyright} from 'components/games';
import {ActionButtons} from './ActionButtons';
import * as View from '../View.style';

export function MoreView({game})
{
    return (
        <RowLayout fullSize>
            <View.LeftPan>
                <ActionButtons game={game}/>
            </View.LeftPan>
            <View.RightPan>
                <S.Content>
                    <GameCopyright game={game}/>
                </S.Content>
            </View.RightPan>
        </RowLayout>
    );
}
