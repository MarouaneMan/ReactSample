import {createAsyncThunk} from '@reduxjs/toolkit';
import {Profile} from 'services';

export const doCreateProfile = createAsyncThunk('profileEditor/doCreateProfile',
    async (params) => await Profile.CreateProfile(params)
);

export const doCreateProfileReducer = {

    [doCreateProfile.pending]: state => {
        state.isWorking = true;
    },

    [doCreateProfile.fulfilled]: (state, {payload}) => {
        state.isWorking = false;
        if (payload.hasError)
            state.error = payload.error;
        else
        {
            state.profileName    = payload.realName;
            state.uid            = payload.uid;
            state.profileCreated = true;
        }
    },

    [doCreateProfile.rejected]: state => {
        state.isWorking = false;
    }
};
