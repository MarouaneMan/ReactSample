import {Endpoints, PublicClient as client} from 'api';
import {doRequest, StatusCodes} from 'helpers';

export async function getMethod({username})
{
    return doRequest({
        request: client.get(Endpoints.PASSWORD_RESET.GET_METHOD, {
            params: {
                username: username
            }
        }),

        [StatusCodes.OK]: (response) => {
            const methods        = response.data;
            let availableMethods = {};

            for (const method in methods)
            {
                if (methods.hasOwnProperty(method))
                {
                    if (methods[method] === true)
                        availableMethods = {...availableMethods, [method]: methods[method]};
                }
            }

            return {
                error: false,
                availableMethods,
            };
        },

        [StatusCodes.FORBIDDEN]: {error: 'error.try_again_later'},
        [StatusCodes.NOT_FOUND]: {error: 'recovery.player_not_found'}
    });
}

export async function askCode({username, method, language})
{
    return doRequest({
        request: client.post(Endpoints.PASSWORD_RESET.ASK_CODE, {
            username: username,
            method  : method,
            language: language,
        }),

        [StatusCodes.OK]       : {error: false},
        [StatusCodes.FORBIDDEN]: {error: 'error.try_again_later'},
    });
}

export async function verifyCode({username, code})
{
    return doRequest({
        request: client.post(Endpoints.PASSWORD_RESET.VERIFY_CODE, {
            username,
            code
        }),

        [StatusCodes.OK]         : {error: false},
        [StatusCodes.BAD_REQUEST]: {error: 'recovery.step_verify_code_error'}
    });
}

export async function resetPassword({username, code, new_password})
{
    return doRequest({
        request: client.post(Endpoints.PASSWORD_RESET.RESET, {
            username,
            code,
            new_password,
        }),

        [StatusCodes.OK]: {error: false}
    });
}
