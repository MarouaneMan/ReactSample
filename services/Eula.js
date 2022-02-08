import {Endpoints, PrivateClient as client} from 'api';
import {doRequest, StatusCodes} from 'helpers';

class Eula {

    Load(game)
    {
        return doRequest({
            request         : client.get(`${Endpoints.EULA.GET}/${game.alias}`),
            [StatusCodes.OK]: ({data}) => data.eula
        });
    }

    Approve(game)
    {
        return doRequest({
            request         : client.post(Endpoints.EULA.APPROVE, {
                alias: game.alias,
            }),
            [StatusCodes.OK]: true
        });
    }
}

export default new Eula();
