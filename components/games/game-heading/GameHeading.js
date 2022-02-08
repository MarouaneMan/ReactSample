import * as S from './GameHeading.style';
import {ColumnLayout} from 'components/ui';

export function GameHeading({game})
{
    return (
        <ColumnLayout>
            <S.Name>{game.name}</S.Name>
            <S.Studio>{game.publisher}</S.Studio>
        </ColumnLayout>
    )
}
