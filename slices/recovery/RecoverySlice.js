import {createSlice} from '@reduxjs/toolkit';
import i18n from 'i18n';
import {doGetMethodReducer} from './doGetMethod';
import {doAskCodeReducer} from './doAskCode';
import {doVerifyCodeReducer} from './doVerifyCode';
import {doResetPasswordReducer} from './doResetPassword';

const initialState = {
    step1Done       : false,
    step2Done       : false,
    step3Done       : false,
    step4Done       : false,
    lang            : i18n.language,
    username        : '',
    code            : '',
    error           : null,
    availableMethods: null,
};

//Slice
const recoverySlice = createSlice({
    name: 'recovery',

    initialState,

    reducers: {
        updateUsername: (state, action) => {
            state.username = action.payload;
        },
        updateCode    : (state, action) => {
            state.code = action.payload;
        },
        resetSteps    : () => initialState
    },

    extraReducers: {
        ...doGetMethodReducer,
        ...doAskCodeReducer,
        ...doVerifyCodeReducer,
        ...doResetPasswordReducer,
    },
});

// Reducer
export const recoveryReducer = recoverySlice.reducer;

// Actions
export const {updateUsername, updateCode, resetSteps} = recoverySlice.actions;

// Selector
export const recoverySelector = (state) => state.recovery;


