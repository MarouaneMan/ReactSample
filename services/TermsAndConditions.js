import FrontEndHelper from './FrontEndHelper';
import {doRequest, StatusCodes} from 'helpers';
import {Endpoints, PrivateClient as client} from 'api';

class TermsAndConditions {

    GetTC()
    {
        let tc = FrontEndHelper.GetConfig()['TermsAndConditions'];
        return {
            title  : tc.title,
            content: tc.content
        };
    }

    Signed()
    {
        // Weird response...
        return typeof (FrontEndHelper.GetConfig()['TermsAndConditions']) !== 'object';
    }

    async Sign()
    {
        return doRequest({
            request         : client.post(Endpoints.SIGN_TERMS_AND_COND),
            [StatusCodes.OK]: true
        });
    }
}

export default new TermsAndConditions();
