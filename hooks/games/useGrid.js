import {useEffect, useRef, useState} from 'react';
import {useSpatialNavContext} from 'context';

export function useGrid(columns)
{
    const gridRef                     = useRef();
    const gridInitialTopPosition      = useRef();
    const [sliceCount, setSliceCount] = useState(0);
    const initialSliceCount           = useRef(0);
    const maxSliceCount               = useRef(0);
    const {refreshTree}               = useSpatialNavContext();

    // Refresh spatial nav tree rects when append more games
    useEffect(() => {
        refreshTree({forceRefresh: true});
    }, [sliceCount]);

    const onScroll = () => {

        const bodyHeight = document.body.offsetHeight;
        const gridRect   = gridRef.current.getBoundingClientRect();

        // Refresh spatial nav tree rects when we are close to the initial position of the grid
        const topThreshold = 100; // pixels
        if (gridRect.top < gridInitialTopPosition.current && gridInitialTopPosition.current - gridRect.top <= topThreshold)
            refreshTree({forceRefresh: true});

        // If we are far from 300px from the bottom of the body, increment
        // slice count
        const bottomThreshold = 300; // pixels
        const bottomDiff      = gridRect.bottom - bodyHeight;
        if (bottomDiff <= bottomThreshold)
            setSliceCount(currentCount => Math.min(currentCount + 3, maxSliceCount.current));
    };

    useEffect(() => {

        // Add scroll listener
        const gamesWrapper = document.getElementById('GamesWrapper');
        gamesWrapper.addEventListener('scroll', onScroll);

        // Save grid initial top position
        gridInitialTopPosition.current = gridRef.current.getBoundingClientRect().top;

        // Deduce GameItem size
        const gridRect                  = gridRef.current.getBoundingClientRect();
        const gridVerticalSpace         = document.body.offsetHeight - gridRect.top;
        const gameItemApproximateWidth  = gridRect.width / columns.length;
        const gameItemApproximateHeight = gameItemApproximateWidth / 0.71; // 0.71 = aspect ratio of the vertical GameItem

        // Init Max Slice count
        columns.forEach(col => maxSliceCount.current = Math.max(maxSliceCount.current, col.length));

        // Calculate & set initial slice count
        initialSliceCount.current = gridVerticalSpace / gameItemApproximateHeight;
        initialSliceCount.current = Math.ceil(initialSliceCount.current + 1);
        setSliceCount(Math.min(initialSliceCount.current, maxSliceCount.current));

        // Debug
        if (process.env.NODE_ENV === 'development')
        {
            console.groupCollapsed('InfiniteScroll init');
            console.log('Grid vertical space :', gridVerticalSpace);
            console.log('GameItem Approx width : ', gameItemApproximateWidth);
            console.log('GameItem Approx height : ', gameItemApproximateHeight);
            console.log('InitialSlice count : ', initialSliceCount.current);
            console.log('Max Slice count = ', maxSliceCount.current);
            console.groupEnd();
        }

        // Remove scroll listener on unmount
        return () => {
            gamesWrapper.removeEventListener('scroll', onScroll);
        };
    }, []);

    return {gridRef, sliceCount, initialSliceCount};
}
