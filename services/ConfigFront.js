import {Endpoints, PrivateClient as client} from 'api';
import {doRequest, StatusCodes} from 'helpers';

class ConfigFront {

    constructor()
    {
        this.config = {};
    }

    GetConfig()
    {
        return this.config;
    }

    GetRegisterUrl() {
        return this.config.how_to_register_url;
    }

    GetSupportMethods()
    {
        let methods = [];

        if (this.config.support_email)
            methods.push({email: this.config.support_email});

        if (this.config.support_url)
            methods.push({url: this.config.support_url});

        return methods;
    }

    Load()
    {
        return doRequest({
            request         : client.get(`${Endpoints.CONFIG_FRONT}/default`),
            [StatusCodes.OK]: ({data}) => this.config = data
        });
    }
}

export default new ConfigFront();
