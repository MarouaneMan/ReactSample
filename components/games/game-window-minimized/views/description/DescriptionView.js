import {RowLayout} from 'components/ui';
import {GameDescription} from 'components/games';
import {ActionButtons} from './ActionButtons';
import * as View from '../View.style';
import * as S from './DescriptionView.style';

export function DescriptionView({game, firstRender, onUnFavorite, onQuickMatch, onExpandClicked})
{
    return (
        <RowLayout fullSize>
            <View.LeftPan>
                <ActionButtons game={game}
                               firstRender={firstRender}
                               onUnFavorite={onUnFavorite}
                               onQuickMatch={onQuickMatch}/>
            </View.LeftPan>
            <View.RightPan>
                <S.Content>
                    <GameDescription onExpandClicked={onExpandClicked} game={game} minimized={true}/>
                </S.Content>
            </View.RightPan>
        </RowLayout>
    );
}
