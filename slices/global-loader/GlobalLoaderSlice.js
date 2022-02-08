import {createSlice} from '@reduxjs/toolkit';

// Slice
const globalLoaderSlice = createSlice({

    name: 'globalLoader',

    initialState: {
        visible: false,
    },

    reducers: {

        showGlobalLoader: (state) => {
            state.visible = true;
        },

        hideGlobalLoader: (state) => {
            state.visible = false;
        }
    }
});

// Actions
export const {showGlobalLoader, hideGlobalLoader} = globalLoaderSlice.actions;

// Selector
export const globalLoaderSelector = state => state.globalLoader;

// Reducer
export const globalLoaderReducer = globalLoaderSlice.reducer;
