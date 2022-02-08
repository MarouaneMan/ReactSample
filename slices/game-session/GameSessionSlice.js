import {createSlice} from '@reduxjs/toolkit';
import {doStartSessionReducer} from './doStartSession';
import {doLoadSGXConfigReducer} from './doLoadSGXConfig';
import {initialState} from './initialState';
import {SESSION_STATE} from './SessionState';

// Slice
const gameSessionSlice = createSlice({

    name: 'gameSession',

    initialState,

    reducers: {
        sessionRunning: (state) => {
            state.sessionState = SESSION_STATE.RUNNING;
        },

        setSessionError: (state, {payload}) => {
            state.sessionError = {...payload};
        },

        sessionTerminated: () => initialState,
        resetGameSession : () => initialState
    },

    extraReducers: {
        ...doStartSessionReducer,
        ...doLoadSGXConfigReducer,
    }
});

// Actions
export const {resetGameSession, sessionTerminated, sessionRunning, setSessionError} = gameSessionSlice.actions;

// Selector
export const gameSessionSelector = state => state.gameSession;

// Reducer
export const gameSessionReducer = gameSessionSlice.reducer;

// Thunks
export {doStartSession} from './doStartSession';
export {doLoadSGXConfig} from './doLoadSGXConfig';
