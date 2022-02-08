import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Profile} from 'services';

// Thunks
export const doPinCodeCheck = createAsyncThunk('pinCodeCheck/doPinCodeCheck', async (params) => {
    return await Profile.CheckPinCode(params);
});

const initialState = {
    isChecking    : false,
    invalidPinCode: false,
    checkPassed   : false,
    pinCode       : '',
};

// Slice
const pinCodeCheckSlice = createSlice({

    name: 'pinCodeCheck',

    initialState,

    reducers: {

        initPinCodeCheck: (state, action) => ({...initialState}),

        setPinCode: (state, action) => {
            state.pinCode = action.payload;
        }
    },

    extraReducers: {

        [doPinCodeCheck.pending]: (state) => {
            state.isChecking = true;
        },

        [doPinCodeCheck.fulfilled]: (state, action) => {
            if (action.payload)
                state.checkPassed = true;
            else
                state.invalidPinCode = true;
            state.isChecking = false;
        },

        [doPinCodeCheck.rejected]: (state) => {
            state.isChecking = false;
        },
    }
});

// Actions
export const {initPinCodeCheck, setPinCode} = pinCodeCheckSlice.actions;

// Selector
export const pinCodeCheckSelector = state => state.pinCodeCheck;

// Reducer
export const pinCodeCheckReducer = pinCodeCheckSlice.reducer;

