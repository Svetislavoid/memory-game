import { configureStore } from '@reduxjs/toolkit';
import pageRouterReducer from '@/utilities/page-router/pageRouterSlice';

export default configureStore({
  reducer: {
    pageRouter: pageRouterReducer,
  }
});
