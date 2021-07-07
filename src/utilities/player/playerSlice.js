import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    value: '',
    score: 0
  },
  reducers: {
    setPlayer: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayer, setScore } = playerSlice.actions;

export default playerSlice.reducer;
