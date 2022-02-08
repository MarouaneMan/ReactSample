import {createSlice} from '@reduxjs/toolkit';

// Slice
const profileSlice = createSlice({

    name: 'profile',

    initialState: {
        profiles      : [],
        currentProfile: null,
    },

    reducers: {

        setInitialProfiles: (state, action) => {
            state.profiles = action.payload;
        },

        setCurrentProfile: (state, action) => {
            state.currentProfile = action.payload;
        },

        addProfile: (state, action) => {
            state.profiles.push(action.payload);
        },

        updateProfile: (state, action) => {
            const index = state.profiles.findIndex(p => p.uid === action.payload.uid);
            if (index > -1)
                state.profiles[index] = {...state.profiles[index], ...action.payload};
        },

        deleteProfile: (state, action) => {
            const index = state.profiles.findIndex(p => p.uid === action.payload);
            if (index > -1)
                state.profiles.splice(index, 1);
        },
    },

    extraReducers: {}
});

// Actions
export const {
                 setInitialProfiles, setCurrentProfile, addProfile,
                 deleteProfile, updateProfile
             } = profileSlice.actions;

// Selector
export const profileSelector = state => state.profile;

// Reducer
export const profileReducer = profileSlice.reducer;
