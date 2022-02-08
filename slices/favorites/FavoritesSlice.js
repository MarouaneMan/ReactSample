import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Favorites} from 'services';

// Thunks
export const setFavorite = createAsyncThunk('favorites/setFavorite', (params) => {
    Favorites.SetGameFav(params.profileUID, params.game, params.favorite);
    return params;
});

export const getFavorites = createAsyncThunk('favorites/getFavorites', async (params) => {
    return await Favorites.GetFavorites(params.profileUID, params.pinCode);
});

// Slice
const favoritesSlice = createSlice({

    name: 'favorites',

    initialState: {
        favorites: []
    },

    extraReducers: {
        [getFavorites.fulfilled]: (state, {payload}) => {
            state.favorites = payload;
        },
        [setFavorite.fulfilled] : (state, {payload}) => {
            if (payload.favorite)
                state.favorites.push(payload.game.alias);
            else
            {
                const index = state.favorites.findIndex(e => e === payload.game.alias);
                if (index > -1)
                    state.favorites.splice(index, 1);
            }
        },
    }
});

// Actions
export const {setFavorites} = favoritesSlice.actions;

// Selector
export const favoritesSelector = state => state.favorites;

// Reducer
export const favoritesReducer = favoritesSlice.reducer;
