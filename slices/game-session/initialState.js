// Initial state
import {SESSION_STATE} from './SessionState';

export const initialState = {
    sessionData : null,
    sessionError: null,
    SGXConfig   : null,
    sessionState: SESSION_STATE.INITIAL,
};
