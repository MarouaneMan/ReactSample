import {Games, LocalStore} from 'services';
import {isMobile} from '../app/device';

class Search {

    constructor()
    {
        this.store = JSON.parse(LocalStore.Get('search')) || {
            mostResearchedCues : [],
            mostResearchedGames: [],
        };
    }

    Find(cue, t)
    {
        cue           = cue.toLowerCase();
        const results = [];
        Games.GetGames().forEach(game => {
            if (
                game.name.toLowerCase().includes(cue) ||
                // user-visible (localized) category names
                game.category.some(c => t(`categories.${c.toLowerCase()}`).toLowerCase().includes(cue)) ||
                // publisher and description may be empty in some staging environments
                game.publisher?.toLowerCase().includes(cue) ||
                (cue.length >= 4 && game.assets.description?.toLowerCase().includes(cue))
            )
                results.push({...game, index: results.length});
        });

        if (results.length > 0)
            this.UpdateMostResearched(cue, results);

        return results;
    }

    UpdateMostResearched(cue, games)
    {
        // Update cues
        this.UpdateEntries(this.store.mostResearchedCues, cue);

        // Update games
        games.forEach(game => this.UpdateEntries(this.store.mostResearchedGames, game.name));

        // Sort cues
        this.Sort(this.store.mostResearchedCues);

        // Sort games
        this.Sort(this.store.mostResearchedGames);

        // Limit cues to 5
        this.store.mostResearchedCues = this.store.mostResearchedCues.slice(0, 5);

        // Limit games to 6
        this.store.mostResearchedGames = this.store.mostResearchedGames.slice(0, 6);

        // Commit to store
        this.Commit();
    }

    UpdateEntries(entries, entryName)
    {
        let cueEntry = entries.find(entry => entry.name === entryName);
        if (cueEntry)
            cueEntry.count++;
        else
        {
            entries.push({
                name     : entryName,
                count    : 0,
                timestamp: new Date().getTime()
            });
        }
    }

    Sort(entries)
    {
        entries.sort((a, b) => {

            // Sort by count
            if (a.count > b.count) return -1;
            if (a.count < b.count) return 1;

            // Sort by timestamp
            if (a.timestamp > b.timestamp) return -1;
            if (a.timestamp < b.timestamp) return 1;

            return 0;
        });
    }

    GetMostResearchedCues()
    {
        return this.store.mostResearchedCues;
    }

    GetMostResearchedGames()
    {
        // TODO : replace with API when it goes live
        //deep cloning highlights
        const highlights = JSON.parse(JSON.stringify(Games.GetHighLights().games));

        return isMobile ? highlights.slice(0, 4) : highlights.slice(0, 6);
    }

    Commit()
    {
        LocalStore.Set('search', JSON.stringify(this.store));
    }
}

export default new Search();
