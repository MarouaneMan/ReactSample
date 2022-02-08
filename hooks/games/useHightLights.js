import {Games} from 'services';
import {isMobile, isTV} from 'app/device';

export function useHighLights()
{
    const {highlighted, games}             = Games.GetHighLights();

    // Init columns
    let maxCols = isTV ? 6 : isMobile ? 4 : 5;
    let columns = [...Array(maxCols)].map(() => []);

    // Fill columns
    games.forEach((game, index) => columns[index % maxCols].push(game));

    return {highlighted, columns, games};
}
