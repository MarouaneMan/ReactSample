import {createAsyncThunk} from '@reduxjs/toolkit';
import {getMethod} from 'services/PasswordReset';

/** Thunks */
export const doGetMethod = createAsyncThunk(
    'recovery/doGetMethod',
    async (params) => {
        return await getMethod(params);
    }
);

// Get Method
export const doGetMethodReducer = {
    [doGetMethod.pending]: (state) => {
        state.error = null;
    },

    [doGetMethod.fulfilled]: (state, action) => {
        if (action.payload.error)
        {
            state.error = action.payload.error;
        }
        else
        {
            state.step1Done        = true;
            state.availableMethods = action.payload.availableMethods;
        }
    },

    [doGetMethod.rejected]: (state) => {
        state.error = 'error.internal';
    },
};
