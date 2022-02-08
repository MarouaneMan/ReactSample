import {Endpoints, PublicClient as client, PrivateClient} from 'api';
import {doRequest, StatusCodes} from 'helpers';
import {LocalStore} from './LocalStore';
import JwtDecode from 'jwt-decode';

class Authentication {

    constructor()
    {
        this.token         = LocalStore.Get('token');
        this.refresh_token = LocalStore.Get('refresh_token');
        this.persist       = !!this.token;
        if (this.token)
            this.decodedToken = Authentication.DecodeToken(this.token);
    }

    GetUsername()
    {
        return this.decodedToken?.username;
    }

    GetUserStatus()
    {
        return this.decodedToken?.status;
    }

    GetTokens()
    {
        return {
            token        : this.token,
            refresh_token: this.refresh_token
        };
    }

    IsLoggedIn()
    {
        return this.token && this.refresh_token;
    }

    ClearTokens()
    {
        this.token         = null;
        this.refresh_token = null;
        LocalStore.Delete('token');
        LocalStore.Delete('refresh_token');
    }

    SaveTokens(data, persist)
    {
        this.persist       = persist;
        this.token         = data.token;
        this.refresh_token = data.refresh_token;
        this.decodedToken  = Authentication.DecodeToken(this.token);

        if (persist)
        {
            LocalStore.Set('token', this.token);
            LocalStore.Set('refresh_token', this.refresh_token);
        }
    }

    async Login({username, password, rememberMe})
    {
        return doRequest({

            request: client.post(Endpoints.AUTH, {
                '_username': username,
                '_password': password
            }),

            [StatusCodes.OK]: response => {
                this.SaveTokens(response.data, rememberMe);
                return true;
            },

            [StatusCodes.UNAUTHORIZED]: false
        });
    }

    async RefreshToken()
    {
        const onRefreshFail = (why) => {
            return {refreshed: false, why};
        };

        return doRequest({

            request: client.post(Endpoints.REFRESH_TOKEN, {
                'refresh_token': this.refresh_token,
            }),

            [StatusCodes.OK]: response => {
                this.SaveTokens(response.data, this.persist);
                return {refreshed: true};
            },

            default      : onRefreshFail,
            network_error: onRefreshFail
        });
    }

    async CheckPassword(password)
    {
        return doRequest({

            request: PrivateClient.post(Endpoints.CHECK_PASSWORD, {
                'password': password,
            }),

            [StatusCodes.OK]          : {hasError: false},
            [StatusCodes.UNAUTHORIZED]: {hasError: true, error: 'profile.bad_password'},
            [StatusCodes.FORBIDDEN]   : {hasError: true, error: 'error.try_again_later'},
        });
    }

    static DecodeToken(token)
    {
        try
        {
            return JwtDecode(token);
        }
        catch (e)
        {
            console.error(e);
        }
        return null;
    }
}

export default new Authentication();
