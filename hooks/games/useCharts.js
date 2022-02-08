import {Games} from 'services';
import {isMobile, isTV} from 'app/device';
import {useTranslation} from 'react-i18next';

const categoriesForColumns = {
    7: ['action', 'adventure', 'kids', 'puzzle', 'sports', 'multiplayer'],
    6: ['action', 'adventure', 'kids', 'sports', 'multiplayer'],
    5: ['action', 'adventure', 'kids', 'multiplayer'],
    4: ['action', 'adventure', 'multiplayer'],
};

// highest session count goes first
const sessionCountCompare = (a, b) => b.sessionCount - a.sessionCount;

export function useCharts()
{
    // make copies of game arrays before sorting by session count
    const allGames      = [...Games.GetGames()].sort(sessionCountCompare);
    const allCategories = Games.GetCategories().map(category => ({
        ...category,
        games: [...category.games].sort(sessionCountCompare)
    }));
    const {t}           = useTranslation();

    // Init columns
    let maxCols = isTV ? 6 : isMobile ? 4 : 5;
    let columns = [...Array(maxCols)].map(() => []);

    // restrict categories according to number of columns
    const categories = allCategories.filter(c => categoriesForColumns[maxCols].includes(c.name));

    // All stars
    columns[0]       = allGames.slice(0, 10);
    const colsTitles = [t('charts.all_stars')];

    // Fill rest of cols
    // categories may be empty if for some reason there are no games
    for (let i = 1; i < columns.length && i <= categories.length; i++)
    {
        columns[i] = categories[i - 1].games.slice(0, 10);
        colsTitles.push(t(`categories.${categories[i - 1].name.toLowerCase()}`));
    }

    // Make games list
    let games = [];
    for (let i = 0; i < 10; i++)
    {
        for (let j = 0; j < columns.length; j++)
            if (i < columns[j].length)
            {
                columns[j][i] = {...columns[j][i], index: games.length};
                games.push(columns[j][i]);
            }
    }
    return {columns, games, colsTitles};
}
