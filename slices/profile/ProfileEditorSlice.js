import {createSlice} from '@reduxjs/toolkit';
import {doCreateProfileReducer} from './doCreateProfile';
import {doUpdateProfileReducer} from './doUpdateProfile';
import {doDeleteProfileReducer} from './doDeleteProfile';

const initialState = {
    profileName       : '',
    uid               : null,
    isWorking         : false,
    isDeleting        : false,
    contentRating     : null,
    locked            : null,
    pinCode           : '',
    error             : null,
    profileCreated    : false,
    profileUpdated    : false,
    avatar            : null,
    mode              : 'create',
    oldState          : {},
    deleteConfirmation: false,
};

// Slice
const profileEditorSlice = createSlice({

    name: 'profileEditor',

    initialState,

    reducers: {

        updateProfileName: (state, action) => {
            state.profileName = action.payload;
        },

        updateContentRating: (state, action) => {
            state.contentRating = action.payload;
        },

        updateProfileLocked: (state, action) => {
            state.locked = action.payload;
        },

        updatePINCode: (state, action) => {
            state.pinCode = action.payload;
        },

        updateAvatar: (state, action) => {
            state.avatar = action.payload;
        },

        clearProfileError: (state) => {
            state.error = null;
        },

        showDeleteProfileConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload;
        },

        setProfileEditionMode: (state, action) => {
            state.mode = action.payload;
        },

        initCreateProfileMode: (state) => {
            state.mode = 'create';
        },

        initUpdateProfileMode: (state, action) => ({
            ...initialState,
            ...action.payload,
            mode    : 'update',
            oldState: {...action.payload}
        }),

        resetProfileEditor: () => initialState,
    },

    extraReducers: {
        ...doCreateProfileReducer,
        ...doUpdateProfileReducer,
        ...doDeleteProfileReducer
    }
});

// Actions
export const {
                 updateProfileName, updateContentRating, updateProfileLocked,
                 updatePINCode, updateAvatar, setProfileEditionMode,
                 showDeleteProfileConfirmation, clearProfileError,
                 initCreateProfileMode, initUpdateProfileMode, resetProfileEditor
             } = profileEditorSlice.actions;

// Selector
export const profileEditorSelector = state => state.profileEditor;

// Reducer
export const profileEditorReducer = profileEditorSlice.reducer;

// Thunks
export {doCreateProfile} from './doCreateProfile';
export {doUpdateProfile} from './doUpdateProfile';
export {doDeleteProfile} from './doDeleteProfile';
