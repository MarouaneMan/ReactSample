import {Games} from 'services';
import {useSelector} from 'react-redux';
import {globalNavigationSelector} from 'slices';
import {isMobile, isTV} from 'app/device';

export function useCategories()
{
    const allGames     = Games.GetGames();
    const {currentTab} = useSelector(globalNavigationSelector);

    // Init columns
    let maxCols   = isTV ? 6 : isMobile ? 4 : 5;
    const columns = [...Array(maxCols)].map(() => []);

    // Fill columns
    let games = currentTab.subTab === 'all' ? allGames : Games.GetCategory(currentTab.subTab);
    games.forEach((game, index) => {
        columns[index % maxCols].push(game);
    });

    return {
        currentTab,
        columns,
        games,
    };
}
