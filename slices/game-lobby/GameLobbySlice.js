import {createSlice} from '@reduxjs/toolkit';

export const LOBBY_STATE = {
    INITIAL        : {id: 0, label: 'join'},
    CONNECTING     : {id: 1, label: 'connecting'},
    WAITING_PLAYERS: {id: 2, label: 'waiting_players'},
    FORCE_PLAY     : {id: 3, label: 'force_play'},
    STARTING       : {id: 4, label: 'starting'},
    PLAYING        : {id: 5, label: 'playing'}
};

const initialState = {
    ownerUID  : null,
    players   : [],
    lobbyState: LOBBY_STATE.INITIAL,
    forceStart: false,
};

// Slice
const gameLobbySlice = createSlice({

    name: 'gameLobby',

    initialState,

    reducers: {

        setGameLobbyState: (state, action) => {
            state.lobbyState = {...action.payload};
        },

        updateLobby: (state, {payload}) => {
            state.ownerUID = payload.ownerUID;
            state.players  = [...payload.players];
        },

        forceGameLobbyStart: (state) => {
            state.forceStart = true
        },

        resetGameLobby: () => initialState
    },
});

// Actions
export const {resetGameLobby, setGameLobbyState, updateLobby, forceGameLobbyStart} = gameLobbySlice.actions;

// Selector
export const gameLobbySelector = state => state.gameLobby;

// Reducer
export const gameLobbyReducer = gameLobbySlice.reducer;
