import {showGlobalMessageBox} from 'slices';
import store from 'app/store';
import i18n from 'i18n';

// Handle network error case
const handleNetworkError = () => {
    // Show network error message
    store.dispatch(
        showGlobalMessageBox({
            message: i18n.t('error.network'),
        })
    );

    // handleNetworkError is a procedure, return nothing
};

// Handle unexpected response case
const handleUnexpectedResponse = (response) => {
    // Show internal error message
    store.dispatch(
        showGlobalMessageBox({
            message: i18n.t('error.internal'),
        })
    );

    // Return unexpected response exception
    return Promise.reject(
        new Error(`Unexpected http response ${response.status}`)
    );
};

export async function doRequest(params)
{
    // Evaluate doRequest actions
    let evaluateAction = (actionKey, response) => {
        let action = params[actionKey];

        // If the action is a function, evaluate it
        // And return its return value
        if (typeof action === 'function') return action(response);

        // Else simply return the action value
        return action;
    };

    try
    {
        // Axios request
        const response = await params.request;

        // Check if the status is expected
        if (params.hasOwnProperty(response.status))
            return evaluateAction(response.status, response);

        // Unexpected response, check if we have a default action
        if (params.hasOwnProperty('default'))
            return evaluateAction('default', response);

        // Unexpected response
        return handleUnexpectedResponse(response);
    }
    catch (exception)
    {
        // Network error / CORS block...
        if (params.hasOwnProperty('network_error'))
        {
            // Network error action must be a procedure
            if (typeof params['network_error'] !== 'function')
                throw new Error('network_error action must be a procedure');
            params['network_error']();
        }
        else
        {
            // handle network error
            handleNetworkError();
        }
        throw exception;
    }
}
