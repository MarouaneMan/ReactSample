import {createAsyncThunk} from '@reduxjs/toolkit';
import {resetPassword} from 'services/PasswordReset';

export const doResetPassword = createAsyncThunk(
    'recovery/doResetPassword',
    async (params) => {
        return await resetPassword(params);
    }
);

export const doResetPasswordReducer = {
    [doResetPassword.pending]: (state) => {
        state.hasError = false;
    },

    [doResetPassword.fulfilled]: (state, action) => {

        if (action.payload.error === false)
        {
            state.step4Done = true;
        }
        else
        {
            state.error = action.payload.error;
        }
    },

    [doResetPassword.rejected]: (state) => {
        state.error = 'error.internal';
    }
};
