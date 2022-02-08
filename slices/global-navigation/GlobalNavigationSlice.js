import {createSlice} from '@reduxjs/toolkit';
import Routes from 'app/routes';

const initialState = {

    currentTab: {
        name  : 'charts',
        subTab: '',
    },

    navigation: {
        highlights: {route: Routes.GAMES.HIGHLIGHTS},
        charts    : {route: Routes.GAMES.CHARTS},
        categories: {route: Routes.GAMES.CATEGORIES},
        search    : {route: Routes.GAMES.SEARCH},
    },

    settingsVisible : false,
    favoritesVisible: false,
    visible         : false,
    subMenuVisible  : true,
};

// Slice
const globalNavigationSlice = createSlice({

    name: 'globalNavigation',

    initialState: initialState,

    reducers: {

        setCurrentTab: (state, action) => {
            if (state.currentTab.name !== action.payload)
            {
                state.currentTab.name   = action.payload;
                state.currentTab.subTab = state.navigation[state.currentTab.name].subMenu?.[0] || '';
                state.subMenuVisible    = true;
            }
        },

        setCurrentSubTab: (state, action) => {
            state.currentTab.subTab = action.payload;
        },

        setSettingsVisible: (state, action) => {
            state.settingsVisible = action.payload;
        },

        toggleSettings: (state) => {
            state.settingsVisible = !state.settingsVisible;
        },

        setGlobalNavCategories: (state, action) => {
            state.navigation.categories.subMenu = ['all', ...action.payload];
        },

        setFavoritesVisible: (state, action) => {
            state.currentTab       = {name: '', subTab: ''};
            state.favoritesVisible = action.payload;
        },

        setSubMenuVisible: (state, action) => {
            state.subMenuVisible = action.payload;
        },

        toggleGlobalNavigation: (state) => {
            state.visible = !state.visible;
        },

        resetGlobalNavigation: () => initialState
    }
});

// Actions
export const {
                 setCurrentTab, setCurrentSubTab,
                 setFavoritesVisible, setSettingsVisible,
                 toggleGlobalNavigation, toggleSettings,
                 resetGlobalNavigation, setGlobalNavCategories,
                 setSubMenuVisible
             } = globalNavigationSlice.actions;

// Selector
export const globalNavigationSelector = state => state.globalNavigation;

// Reducer
export const globalNavigationReducer = globalNavigationSlice.reducer;
