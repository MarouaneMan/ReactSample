import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    message: null,
    type   : 'error',
    routeTo: null
}

// Slice
const globalMessageBoxSlice = createSlice({

    name: 'globalMessageBox',

    initialState: initialState,

    reducers: {

        showGlobalMessageBox: (state, {payload}) => {
            state.message = payload.message;
            state.routeTo = payload.routeTo;
            if (payload.type)
                state.type = payload.type;
        },

        hideGlobalMessageBox: () => initialState
    }
});

// Actions
export const {showGlobalMessageBox, hideGlobalMessageBox} = globalMessageBoxSlice.actions;

// Selector
export const globalMessageBoxSelector = state => state.globalMessageBox;

// Reducer
export const globalMessageBoxReducer = globalMessageBoxSlice.reducer;
