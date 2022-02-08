import {Search} from 'services';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {isMobile, isTV} from 'app/device';

export function useSearch()
{
    const [currentCue, setCurrentCue] = useState('');
    const columns                     = useRef([]);
    const games                       = useRef([]);
    const cues                        = Search.GetMostResearchedCues();
    const mostSearchedGames           = useRef(Search.GetMostResearchedGames());
    const {t}                         = useTranslation();

    useEffect(() => {
        games.current = mostSearchedGames.current;
    }, []);

    const onSearch = (cue) => {

        // Do search
        const results = Search.Find(cue, t);

        // Init columns
        let maxCols     = isTV ? 6 : isMobile ? 4 : 5;
        columns.current = [...Array(maxCols)].map(() => []);

        // Fill columns
        results.forEach((game, index) => columns.current[index % maxCols].push(game));

        // Set games
        games.current = results;

        // Set current cue
        setCurrentCue(cue);
    };

    return {
        games            : games.current,
        columns          : columns.current,
        cues,
        onSearch,
        currentCue,
        mostSearchedGames: mostSearchedGames.current
    };
}
