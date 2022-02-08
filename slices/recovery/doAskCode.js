import {createAsyncThunk} from '@reduxjs/toolkit';
import {askCode} from 'services/PasswordReset';

/** Thunks */
export const doAskCode = createAsyncThunk(
    'recovery/doAskCode',
    async (params) => {
        return await askCode(params);
    }
);

// Ask code
export const doAskCodeReducer = {
    [doAskCode.pending]: (state) => {
        state.error = false;
    },

    [doAskCode.fulfilled]: (state, action) => {

        if (action.payload.error === false)
        {
            state.step2Done = true;
        }
        else
        {
            state.error = action.payload.error;
        }
    },

    [doAskCode.rejected]: (state) => {
        state.error = 'error.internal';
    },
};
