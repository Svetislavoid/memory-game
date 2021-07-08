import { createSlice } from '@reduxjs/toolkit';

export const pageRouterSlice = createSlice({
  name: 'pageRouter',
  initialState: {
    page: 'home',
  },
  reducers: {
    changePage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changePage } = pageRouterSlice.actions;

export default pageRouterSlice.reducer;
