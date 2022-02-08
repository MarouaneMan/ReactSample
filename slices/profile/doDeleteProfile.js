import {createAsyncThunk} from '@reduxjs/toolkit';
import {Profile} from 'services';

export const doDeleteProfile = createAsyncThunk('profileEditor/doDeleteProfile',
    async (params) => await Profile.DeleteProfile(params)
);

export const doDeleteProfileReducer = {

    [doDeleteProfile.pending]: state => {
        state.isDeleting = true;
    },

    [doDeleteProfile.fulfilled]: (state, {payload}) => {
        state.isDeleting = false;
        if (payload.hasError)
            state.error = payload.error;
        else
            state.profileDeleted = true;
    },

    [doDeleteProfile.rejected]: state => {
        state.isDeleting = false;
    }
};
