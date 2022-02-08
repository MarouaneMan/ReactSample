import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Authentication} from 'services';
import {encrypt} from 'helpers';

// Thunks
export const doPassCheck = createAsyncThunk('passwordCheck/doPassCheck', async (password) => {
    return await Authentication.CheckPassword(password);
});

const initialState = {
    isChecking : false,
    error      : null,
    checkPassed: false,
    routeFrom  : null,
    routeTo    : null,
    password   : {},
};

// Slice
const passwordCheckSlice = createSlice({

    name: 'passwordCheck',

    initialState,

    reducers: {

        initPassCheck: (state, action) => {
            state.routeFrom   = action.payload.from;
            state.routeTo     = action.payload.to;
            state.error       = null;
            state.checkPassed = false;
            state.password    = {};
        },

        updatePassword: (state, action) => {
            // decrypt password as close as possible to the point of use
            // to reduce the risk of exposing it unencrypted in a state element
            state.password = encrypt(action.payload);
        },

        resetPassCheck: () => initialState
    },

    extraReducers: {
        [doPassCheck.pending]: (state) => {
            state.isChecking = true;
        },

        [doPassCheck.fulfilled]: (state, action) => {
            if (action.payload.hasError)
                state.error = action.payload.error;
            else
                state.checkPassed = true;
            state.isChecking = false;
        },

        [doPassCheck.rejected]: (state) => {
            state.isChecking = false;
        },
    }
});

// Actions
export const {initPassCheck, updatePassword, resetPassCheck} = passwordCheckSlice.actions;

// Selector
export const passwordCheckSelector = state => state.passwordCheck;

// Reducer
export const passwordCheckReducer = passwordCheckSlice.reducer;

