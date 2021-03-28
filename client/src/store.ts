import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { configureStore, getDefaultMiddleware, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

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
    totalContributions: 0,
    contributions: {}
  },
  cooking: {
    openId: null,
    editId: null,
    deleteId: null,
    recipes: defaultRecipes
  }
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
    setCooking: (state, action) => {
      state.cooking = {
        ...state.cooking,
        ...action.payload
      };
    },
    updateRecipe: (state, action) => {
      const { cid, ...recipe } = action.payload;

      // Find index of recipe
      const index = state.cooking.recipes.findIndex((recipe) => recipe.cid === cid);

      const prev = state.cooking.recipes[index];

      state.cooking.recipes[index] = {
        ...prev,
        ...recipe
      };
    },
    addRecipe: (state) => {
      const cid = nanoid();

      state.cooking.editId = cid;

      state.cooking.recipes.unshift({
        cid,
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
        created: new Date().toJSON()
      });
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
