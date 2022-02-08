import {createAsyncThunk} from '@reduxjs/toolkit';
import {Eula} from 'services';

export const approveEula = createAsyncThunk('eula/approve', async (game) => {
    await Eula.Approve(game);
    return game.alias;
});

export const approveEulaReducer = {

    [approveEula.pending]: (state) => {
        state.isApproving = true;
        state.isApproved  = false;
    },

    [approveEula.fulfilled]: (state, action) => {
        state.isApproving = false;
        state.isApproved  = true;
        state.approvedGames.push(action.payload);
    },

    [approveEula.rejected]: (state) => {
        state.isApproving = false;
    }
};
