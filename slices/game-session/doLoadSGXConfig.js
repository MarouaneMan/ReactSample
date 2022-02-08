import {createAsyncThunk} from '@reduxjs/toolkit';
import {GameSession} from 'services';
import {SESSION_STATE} from './SessionState';
import {initialState} from './initialState';

// Thunks
export const doLoadSGXConfig = createAsyncThunk('gameSession/loadSGXConfig', async (params) => {
    return GameSession.LoadSGXConfig(params);
});

export const doLoadSGXConfigReducer = {

    [doLoadSGXConfig.pending]: (state) => {
        state.sessionState = SESSION_STATE.STARTING;
    },

    [doLoadSGXConfig.fulfilled]: (state, {payload}) => {
        state.SGXConfig    = {...payload};
        state.sessionState = SESSION_STATE.CONNECTING;
    },

    [doLoadSGXConfig.rejected]: () => initialState
};
