import * as S from './Grid.style';
import {Column} from '../column/Column';
import {SpatialNavSection} from 'context';
import {If} from 'helpers';
import {useGrid} from 'hooks';

export function Grid({onItemClicked, columns, isGapOpen, lastFocused})
{
    const {gridRef, sliceCount, initialSliceCount} = useGrid(columns);

    return (
        <SpatialNavSection>
            <S.Wrapper ref={gridRef}>
                <If condition={sliceCount > 0}>
                    {columns.map((column, index) =>
                        <Column key={index}
                                games={column}
                                colIndex={index}
                                onItemClicked={onItemClicked}
                                isGapOpen={isGapOpen}
                                lastFocused={lastFocused}
                                isFarRight={index === columns.length - 1}
                                sliceCount={sliceCount}
                                disableAnimation={sliceCount > initialSliceCount.current}/>
                    )}
                </If>
            </S.Wrapper>
        </SpatialNavSection>
    );
}
