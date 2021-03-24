import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { configureStore, getDefaultMiddleware, createSlice } from '@reduxjs/toolkit';

import { State } from './types';
import { defaultRecipes } from './constants';

// Redux store starting state
const initialState: State = {
  error: '',
  user: null,
  slack: {
    online: false,
    messages: []
  },
  twilio: {
    token: ''
  },
  github: {
    total: 0,
    contributions: {}
  },
  recipes: defaultRecipes
};

// Actions are generated from the methods inside the reducers property
export const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    set: (state, action) => ({ ...state, ...action.payload }),
    addMessage: (state, action) => {
      state.slack.messages.push(action.payload);
    },
    setOnline: (state, action) => {
      state.slack.online = action.payload;
    },
    addRecipe: (state, action) => {
      state.recipes.unshift({
        name: '',
        creator: state.user?.email || '',
        difficulty: 1,
        duration: '',
        image: '',
        text: `## Ingredients
- Love
- Sweat
- Tears

## Instructions
1. Put in hard work
2. Serve while warm`,
        ...action.payload
      });
    },
    updateRecipe: (state, action) => {
      const { index, ...recipe } = action.payload;

      const prev = state.recipes[index];

      state.recipes[index] = {
        ...prev,
        ...recipe
      };
    }
  }
});

const store = configureStore({
  reducer,
  devTools: true,
  middleware: getDefaultMiddleware()
});

export default store;

export { useDispatch } from 'react-redux';

// Export a typed version of the useSelector hook
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
