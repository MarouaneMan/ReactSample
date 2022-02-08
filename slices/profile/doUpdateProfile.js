import {createAsyncThunk} from '@reduxjs/toolkit';
import {Profile} from 'services';

export const doUpdateProfile = createAsyncThunk('profileEditor/doUpdateProfile',
    async (params) => await Profile.UpdateProfile(params)
);

export const doUpdateProfileReducer = {

    [doUpdateProfile.pending]: state => {
        state.isWorking = true;
    },

    [doUpdateProfile.fulfilled]: (state, {payload}) => {
        state.isWorking = false;
        if (payload.hasError)
            state.error = payload.error;
        else
            state.profileUpdated = true;
    },

    [doUpdateProfile.rejected]: state => {
        state.isWorking = false;
    }
};
