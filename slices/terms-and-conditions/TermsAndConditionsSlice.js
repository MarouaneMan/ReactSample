import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TermsAndConditions} from 'services';

// Thunks
export const signTC = createAsyncThunk('termsAndConditions/signTC', async () => {
    return await TermsAndConditions.Sign();
});

// Slice
const termsAndConditionsSlice = createSlice({

    name: 'termsAndConditions',

    initialState: {
        termsAccepted: false,
    },

    reducers: {},

    extraReducers: {

        [signTC.fulfilled]: (state) => {
            state.termsAccepted = true;
        }
    }
});

// Actions
export const {setTermsAndConditions} = termsAndConditionsSlice.actions;

// Selector
export const termsAndConditionsSelector = state => state.termsAndConditions;

// Reducer
export const termsAndConditionsReducer = termsAndConditionsSlice.reducer;

