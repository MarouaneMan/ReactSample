import {assetURL, doRequest, preloadImage, StatusCodes} from 'helpers';
import {Endpoints, PrivateClient as client} from 'api';
import FrontEndHelper from './FrontEndHelper';
import i18n from 'i18n';

const releaseStatusOrder = ['new', 'coming_soon', 'up', 'down'];

class Games {

    constructor(options)
    {
        this.options            = options || {};
        this.games              = [];
        this.filteredGames      = [];
        this.filteredCategories = [];
    }

    Filter(minimumAge)
    {
        // Filter games by age
        this.filteredGames = [...this.games]
            .filter(game => minimumAge >= FrontEndHelper.GetMinimumAge(game.content_ratings));

        // general sorting of all games
        this.filteredGames.sort((a, b) => {
            // Sort by priority first
            if (a.priority > b.priority) return -1;
            if (a.priority < b.priority) return 1;

            // then release status
            const statusA = releaseStatusOrder.indexOf(a.release_status);
            const statusB = releaseStatusOrder.indexOf(b.release_status);
            if (statusA !== -1 && statusA < statusB) return -1;
            if (statusB !== -1 && statusA > statusB) return 1;

            // then by localized title
            // this is initialized from assets and current locale, see doRequest
            return a.assets.title.localeCompare(b.assets.title);
        });

        // Lookup table to speed up things
        let categoryLookupTable = {};
        this.filteredCategories = [];

        // Index games and add them to categories
        this.filteredGames.forEach((game, index) => {

            game.index = index;

            game.category.forEach(cat => {
                let gameCat = cat.toLowerCase();
                if (!(gameCat in categoryLookupTable))
                {
                    this.filteredCategories.push({
                        name : gameCat,
                        games: []
                    });
                    categoryLookupTable[gameCat] = this.filteredCategories.length - 1;
                }
                this.filteredCategories[categoryLookupTable[gameCat]].games.push({
                    ...game,
                    index: this.filteredCategories[categoryLookupTable[gameCat]].games.length
                });
            });
        });

        // keep only a specific subset of categories with enough games, and order specifically
        const retainedCategories = [
            'action', 'adventure', 'kids', 'puzzle', 'sports', 'multiplayer'
        ];
        this.filteredCategories  = this.filteredCategories
                                       .filter(cat => retainedCategories.includes(cat.name))
                                       .sort((a, b) => retainedCategories.indexOf(a.name) - retainedCategories.indexOf(b.name));
    }

    GetHighLights()
    {
        // TODO put back 0
        return {
            highlighted: this.filteredGames && this.filteredGames[0], // TODO fix this
            games      : this.filteredGames
        };
    }

    GetGames()
    {
        return this.filteredGames;
    }

    GetCategories()
    {
        return this.filteredCategories;
    }

    GetCategory(category)
    {
        const theCategory = this.filteredCategories.filter(cat => cat.name.toLowerCase() === category.toLowerCase());
        return theCategory[0].games;
    }

    SetStats(profileUID)
    {
        const url = `${Endpoints.STATS}/${profileUID}`;
        return doRequest({
            request         : client.get(url),
            [StatusCodes.OK]: ({data}) => {
                const gameStats = data.platform_stats;
                if (this.options.debug)
                {
                    console.groupCollapsed('Game stats');
                    const aliases = this.games.map(g => g.alias);
                    for (const alias in gameStats)
                    {
                        if (aliases.includes(alias)) console.log(alias, gameStats[alias]);
                    }
                    console.groupEnd();
                }
                // set sessionCount for all games
                // caution: games are duplicated in categories because of the index
                this.games.forEach(game => {
                    game.sessionCount = gameStats[game.alias] || 0;
                });
                this.filteredCategories.forEach(
                    category => category.games.forEach(game => {
                            game.sessionCount = gameStats[game.alias] || 0;
                        }
                    )
                );
            },
            // ignore other errors
            'default': response => {
                if (this.options.debug) console.log('Unexpected response', response.status, `for ${url}`, response);
            }
        });

        //if (this.options.debug)
        //{
        //    console.groupCollapsed('Game stats');
        //    const aliases = this.games.map(g => g.alias);
        //    for (const alias in gameStats)
        //    {
        //        if (aliases.includes(alias)) console.log(alias, gameStats[alias]);
        //    }
        //    console.groupEnd();
        //}
        //// set sessionCount for all games
        //// caution: games are duplicated in categories because of the index
        //this.games.forEach(game => {
        //    game.sessionCount = gameStats[game.alias] || 0;
        //});
        //this.filteredCategories.forEach(
        //    category => category.games.forEach(game => {
        //            game.sessionCount = gameStats[game.alias] || 0;
        //        }
        //    )
        //);
    }

    // DEPRECATED
    async PreloadDeprecated(promises, approvedGamesCallback)
    {
        return doRequest({

                request: client.get(Endpoints.GAMES),

                [StatusCodes.OK]: response => {

                    // Retrieve available packs
                    const data           = response.data;
                    const allGames       = data.games;
                    const packs          = data.packs;
                    const packsAvailable = data.packs_available;

                    let gamesAliasesInAvailablePacks = packs.filter(pack => packsAvailable.includes(pack.alias)).map(pack => pack.games_aliases);

                    // Merging arrays retrieved for more practicality
                    gamesAliasesInAvailablePacks = [].concat.apply([], gamesAliasesInAvailablePacks);

                    // Remove duplicate games (duplicates appear because multiple packs can contain same games)
                    gamesAliasesInAvailablePacks = [...new Set(gamesAliasesInAvailablePacks)];

                    // Retrieve all games in available packs
                    this.games = allGames.filter(game =>

                        // Game status must be up or new
                        (game.release_status === 'up' || game.release_status === 'new')

                        && gamesAliasesInAvailablePacks.includes(game.alias)
                    );

                    // Format games and push optional promises
                    this.games.forEach(game => {
                        // 0 until set though SetStats()
                        game.sessionCount = 0;

                        game.assets.cover          = game.assets?.[i18n.language]?.wallpaper || game.assets?.[this.options.fallbackLang]?.wallpaper;
                        game.assets.thumb          = game.assets?.[i18n.language]?.icon || game.assets?.[this.options.fallbackLang]?.icon;
                        game.assets.thumb_vertical = game.assets?.[i18n.language]?.icon || game.assets?.[this.options.fallbackLang]?.icon;
                        game.assets.description    = game.assets?.[i18n.language]?.description || game.assets?.[this.options.fallbackLang]?.description;
                        game.assets.title          = game.assets?.[i18n.language]?.title || game.assets?.[this.options.fallbackLang]?.title || game.name;
                        game.assets.trailer        = game.assets?.[i18n.language]?.trailer || game.assets?.[this.options.fallbackLang]?.trailer;

                        // Preload thumb
                        if (game.assets.thumb)
                            promises.push(preloadImage(assetURL(game.assets.thumb)));

                        // Preload vertical thumb
                        if (game.assets.thumb_vertical)
                            promises.push(preloadImage(assetURL(game.assets.thumb_vertical)));

                        // QuickMatch
                        game.hasQuickMatch = game['nb_players_online_multi'] && game['nb_players_online_multi'] > 1;
                    });

                    // Approved Eula games
                    approvedGamesCallback((Array.isArray(data.approved_eulas) && data.approved_eulas) || []);

                    // Debug
                    if (this.options.debug)
                    {
                        console.log('Games aliases in available packs:');
                        console.log(gamesAliasesInAvailablePacks);

                        console.log('All available Games: ');
                        console.log(this.games);
                    }
                }
            }
        );
    }

    async Preload(promises, approvedGamesCallback)
    {
        if (process.env.REACT_APP_USE_DEPRECATED_GAMES_API === 'true')
            return this.PreloadDeprecated(promises, approvedGamesCallback);

        return doRequest({

                request: client.get(Endpoints.GAMES),

                [StatusCodes.OK]: response => {

                    // Retrieve available packs
                    const data            = response.data;
                    const allGames        = data.games;
                    const offers          = data.offers;
                    const offersAvailable = data.offers_available;
                    const packs           = data.packs;

                    let packsAliasesInAvailableOffers = offers.filter(offer => offersAvailable.includes(offer.alias)).map(availableOffer => availableOffer.packs_aliases);

                    // Merging arrays retrieved for more practicality
                    packsAliasesInAvailableOffers = [].concat.apply([], packsAliasesInAvailableOffers);

                    // Remove duplicate packs (duplicates appear because multiple packs can contain same games)
                    packsAliasesInAvailableOffers = [...new Set(packsAliasesInAvailableOffers)];

                    let packsInAvailableOffers = packs.filter(pack => packsAliasesInAvailableOffers.includes(pack.alias));

                    let gamesAliasesInAvailableOffersPacks = packsInAvailableOffers.map(pack => pack.games_aliases);

                    // Merging arrays retrieved for more practicality
                    gamesAliasesInAvailableOffersPacks = [].concat.apply([], gamesAliasesInAvailableOffersPacks);

                    // Remove duplicate games (duplicates appear because multiple packs can contain same games)
                    gamesAliasesInAvailableOffersPacks = [...new Set(gamesAliasesInAvailableOffersPacks)];

                    // Retrieve all games in available packs
                    this.games = allGames.filter(game =>

                        // Game status must be up or new
                        (game.release_status === 'up' || game.release_status === 'new')

                        && gamesAliasesInAvailableOffersPacks.includes(game.alias)
                    );

                    // Format games and push optional promises
                    this.games.forEach(game => {
                        // 0 until set though SetStats()
                        game.sessionCount = 0;

                        // icon_square & icon_vertical for grid display
                        game.assets.thumb          = game.assets?.[i18n.language]?.icon_square || game.assets?.[this.options.fallbackLang]?.icon_square;
                        game.assets.thumb_vertical = game.assets?.[i18n.language]?.icon_vertical || game.assets?.[this.options.fallbackLang]?.icon_vertical;

                        //cover square for detail game display
                        game.assets.cover = game.assets?.[i18n.language]?.cover_square || game.assets?.[this.options.fallbackLang]?.cover_square;

                        game.assets.description = game.assets?.[i18n.language]?.description || game.assets?.[this.options.fallbackLang]?.description;
                        game.assets.title       = game.assets?.[i18n.language]?.title || game.assets?.[this.options.fallbackLang]?.title || game.name;
                        game.assets.trailer     = game.assets?.[i18n.language]?.trailer || game.assets?.[this.options.fallbackLang]?.trailer;

                        // Preload cover
                        if (game.assets.cover)
                            promises.push(preloadImage(assetURL(game.assets.cover)));

                        // Preload icon_vertical
                        if (game.assets.thumb_vertical)
                            promises.push(preloadImage(assetURL(game.assets.thumb_vertical)));

                        // Preload cover_square
                        if (game.assets.cover)
                            promises.push(preloadImage(assetURL(game.assets.cover)));

                        // QuickMatch
                        game.hasQuickMatch = game['nb_players_online_multi'] && game['nb_players_online_multi'] > 1;
                    });

                    // Approved Eula games
                    approvedGamesCallback((Array.isArray(data.approved_eulas) && data.approved_eulas) || []);

                    // Debug
                    if (this.options.debug)
                    {
                        console.groupCollapsed('GAMES Preload new API');

                        console.log('Response:');
                        console.log(response);

                        console.log('Offers available:');
                        console.log(offersAvailable);

                        console.log('Offers:');
                        console.log(data.offers);

                        console.log('PacksInAvailableOffers:');
                        console.log(packsAliasesInAvailableOffers);

                        console.log('PacksInAvailableOffers:');
                        console.log(packsInAvailableOffers);

                        console.log('Available games:');
                        console.log(this.games);

                        console.groupEnd();
                    }
                }
            }
        );
    }
}

export default new Games({
    debug       : process.env.NODE_ENV === 'development',
    fallbackLang: 'en'
});
