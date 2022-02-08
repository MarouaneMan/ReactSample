import {createAsyncThunk} from '@reduxjs/toolkit';
import {GameSession} from 'services';
import {SESSION_STATE} from './SessionState';
import {initialState} from './initialState';

// Thunks
export const doStartSession = createAsyncThunk('gameSession/startSession', async (params) => {
    return GameSession.StartSession(params);
});

export const doStartSessionReducer = {

    [doStartSession.pending]: (state) => {
        state.sessionState = SESSION_STATE.STARTING;
    },

    [doStartSession.fulfilled]: (state, {payload}) => {
        if (!payload.error)
            state.sessionData = {...payload};
        else
        {
            state.sessionError = payload;
            state.sessionState = SESSION_STATE.INITIAL;
        }
    },

    [doStartSession.rejected]: () => initialState
};
