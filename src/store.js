import { configureStore } from '@reduxjs/toolkit';
import pageRouterReducer from '@/utilities/page-router/pageRouterSlice';
import playerReducer from '@/utilities/player/playerSlice';

export default configureStore({
  reducer: {
    pageRouter: pageRouterReducer,
    player: playerReducer
  }
});
