import axios from 'axios';
import ClientOptions from './ClientOptions';
import {StatusCodes} from 'helpers';
import {LocalStore, Authentication} from 'services';

export const PrivateClient = axios.create(ClientOptions);

export function setupInterceptors()
{
    // Request interceptor
    PrivateClient.interceptors.request.use(function (config) {

        // Add Authorization Bearer
        config.headers.Authorization = `Bearer ${Authentication.GetTokens().token}`;

        return config;
    }, function (error) {
        // request error
        return Promise.reject(error);
    });

    // Response interceptor
    PrivateClient.interceptors.response.use(async function (response) {

        const TokenPanic = (reason) => {

            // Save panic to LocalStore (debug)
            LocalStore.Set('last_token_panic', JSON.stringify(reason));
            LocalStore.Set('last_token_panic_time', new Date().toString());

            // Clear tokens
            Authentication.ClearTokens();

            // Reload the page
            window.location.reload();
        };

        // Invalid token
        if (response?.status === StatusCodes.UNAUTHORIZED)
        {
            // gsStatusCode 608 Invalid token or no gsStatuscode
            if (response.data?.gsStatusCode === 608 || !response.data.gsStatusCode)
                return TokenPanic(response.data); // Panic, unrecoverable error
        }

        // Expired token
        if (response?.status === StatusCodes.TOKEN_EXPIRED)
        {
            try
            {
                // Try to refresh the jwt token
                const result = await Authentication.RefreshToken();
                if (result.refreshed)
                {
                    // Restart the same request
                    LocalStore.Set('last_token_refresh', new Date().toString());
                    return PrivateClient(response.config);
                }
                else
                    return TokenPanic(result.why); // Panic, unrecoverable error
            }
            catch (e)
            {
                return TokenPanic(e); // Panic, unrecoverable error
            }
        }

        return response;
    }, function (error) {
        return Promise.reject(error);
    });
}
