import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { configureStore, getDefaultMiddleware, createSlice } from '@reduxjs/toolkit';

import { State } from './types';

const initialState = {
  error: ''
};

export const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    set: (state, action) => ({ ...state, ...action.payload })
  }
});

const store = configureStore({
  reducer,
  devTools: true,
  middleware: getDefaultMiddleware()
});

export default store;

export { useDispatch } from 'react-redux';

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
