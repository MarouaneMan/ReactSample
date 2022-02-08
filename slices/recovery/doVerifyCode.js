import {createAsyncThunk} from '@reduxjs/toolkit';
import {verifyCode} from 'services/PasswordReset';

export const doVerifyCode = createAsyncThunk(
    'recovery/doVerifyCode',
    async (params) => {
        return await verifyCode(params);
    }
);

// Verify code
export const doVerifyCodeReducer = {

    [doVerifyCode.pending]: (state) => {
        state.error = false;
    },

    [doVerifyCode.fulfilled]: (state, action) => {

        if (action.payload.error === false)
        {
            state.step3Done = true;
        }
        else
        {
            state.error = action.payload.error;
        }
    },

    [doVerifyCode.rejected]: (state) => {
        state.error = 'error.internal';
    }
};
