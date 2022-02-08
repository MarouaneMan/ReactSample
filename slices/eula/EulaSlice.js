import {createSlice} from '@reduxjs/toolkit';
import {loadEulaReducer} from './LoadEula';
import {approveEulaReducer} from './ApproveEula';

const initialState = {
    eulaText   : '',
    isLoading  : true,
    isApproving: false,
    isApproved : false,
    hasError   : false,
};

// Slice
const eulaSlice = createSlice({

    name: 'eula',

    initialState: {
        approvedGames: [],
        ...initialState,
    },

    reducers: {

        setEulaApprovedGames: (state, action) => {
            state.approvedGames = [...action.payload];
        },

        resetEula: (state) => ({
            approvedGames: state.approvedGames,
            ...initialState
        })
    },

    extraReducers: {
        ...loadEulaReducer,
        ...approveEulaReducer
    }
});

// Actions
export const {resetEula, setEulaApprovedGames} = eulaSlice.actions;

// Selector
export const eulaSelector = state => state.eula;

// Reducer
export const eulaReducer = eulaSlice.reducer;

// Thunks
export {loadEula} from './LoadEula';
export {approveEula} from './ApproveEula';
