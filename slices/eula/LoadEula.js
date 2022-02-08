import {createAsyncThunk} from '@reduxjs/toolkit';
import {Eula} from 'services';

export const loadEula = createAsyncThunk('eula/load', async (params) => {
    return await Eula.Load(params);
});

export const loadEulaReducer = {

    [loadEula.pending]: (state) => {
        state.hasError  = false;
        state.isLoading = true;
    },

    [loadEula.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.eulaText  = action.payload;
    },

    [loadEula.rejected]: (state) => {
        state.hasError = true;
        state.isLoading = false;
    }
};
