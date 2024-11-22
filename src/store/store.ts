import { configureStore } from '@reduxjs/toolkit';
import combineReducers from './rootReducer';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
