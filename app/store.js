import {configureStore} from '@reduxjs/toolkit';
import {
    globalMessageBoxReducer, loginReducer,
    globalLoaderReducer, termsAndConditionsReducer,
    profileReducer, passwordCheckReducer,
    pinCodeCheckReducer, profileEditorReducer,
    recoveryReducer, globalNavigationReducer,
    favoritesReducer, eulaReducer, gameSessionReducer,
    gameLobbyReducer
} from 'slices';

const store = configureStore({
    reducer : {
        globalMessageBox  : globalMessageBoxReducer,
        globalLoader      : globalLoaderReducer,
        login             : loginReducer,
        termsAndConditions: termsAndConditionsReducer,
        profile           : profileReducer,
        profileEditor     : profileEditorReducer,
        passwordCheck     : passwordCheckReducer,
        pinCodeCheck      : pinCodeCheckReducer,
        recovery          : recoveryReducer,
        globalNavigation  : globalNavigationReducer,
        favorites         : favoritesReducer,
        eula              : eulaReducer,
        gameSession       : gameSessionReducer,
        gameLobby         : gameLobbyReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export default store;
