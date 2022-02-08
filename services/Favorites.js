import {Endpoints, PrivateClient as client} from 'api';
import {doRequest, StatusCodes} from 'helpers';

class Favorites {

    SetGameFav(profileUID, game, fav)
    {
        const endpoint = fav ? Endpoints.FAVORITES.ADD : Endpoints.FAVORITES.REMOVE;
        return doRequest({
            request                : client.post(endpoint, {
                profileUid: profileUID, // caution with casing of parameter
                game      : game.alias,
            }),
            [StatusCodes.OK]       : true,
            [StatusCodes.NOT_FOUND]: false // just ignore if API is not available in backend yet
        });
    }

    GetFavorites(profileUID, pinCode)
    {
        // pass pinCode in params for locked profiles
        const data = pinCode ? {params: {pinCode}} : undefined;
        return doRequest({
            request                : client.get(`${Endpoints.PROFILES}/${profileUID}`, data),
            [StatusCodes.OK]       : ({data}) => data.favorite_games_alias,
            [StatusCodes.NOT_FOUND]: [] // just ignore if API is not available in backend yet
        });
    }
}

export default new Favorites();
