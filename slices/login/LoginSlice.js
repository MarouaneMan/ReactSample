import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Authentication} from 'services';
import i18n from 'i18n';

// Thunks
export const doLogin = createAsyncThunk('login/doLogin', async (params) => {
    return await Authentication.Login(params);
});

export const doLogout = createAsyncThunk('login/doLogout', () => {
    Authentication.ClearTokens();
    return true;
});

// Slice
const loginSlice = createSlice({

    name: 'login',

    initialState: {
        isChecking       : false,
        loggedIn         : Authentication.IsLoggedIn(),
        lang             : i18n.language,
        langSelectVisible: false,
    },

    reducers: {
        changeLoginLanguage: (state, action) => {
            state.lang              = action.payload;
            state.langSelectVisible = false;
        },

        showLanguageSelection: (state) => {
            state.langSelectVisible = true;
        }
    },

    extraReducers: {

        [doLogin.pending]: (state) => {
            state.isChecking    = true;
            state.hasLoginError = false;
        },

        [doLogin.fulfilled]: (state, action) => {
            state.isChecking = false;
            if (action.payload)
                state.loggedIn = true;
            else
                state.hasLoginError = true;
        },

        [doLogin.rejected]: (state) => {
            // Other error
            state.isChecking = false;
        },

        [doLogout.fulfilled]: (state) => {
            state.loggedIn = false;
        }
    }
});

// Actions
export const {changeLoginLanguage, showLanguageSelection} = loginSlice.actions;

// Selector
export const loginSelector = state => state.login;

// Reducer
export const loginReducer = loginSlice.reducer;

