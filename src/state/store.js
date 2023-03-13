import {
  createSlice,
  configureStore,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { budgetApi } from "../server/apiSlice";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    monthSelectedId: null,
    budgetItem: {
      id: 0,
      title: "",
    },
  },
  reducers: {
    monthSelected: (state, action) => {
      return { ...state, monthSelectedId: action.payload };
    },
    budgetItemSelected: (state, action) => {
      return {
        ...state,
        budgetItem: { id: action.payload.id, title: action.payload.name },
      };
    },
    [budgetApi.reducerPath]: budgetApi.reducer,
  },
});

// store

export const store = configureStore({
  reducer: {
    budget: budgetSlice.reducer,
    budgetApi: budgetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(budgetApi.middleware),
});

setupListeners(store.dispatch);

store.subscribe(() => console.log(store.getState()));

// actions

export const { monthSelected, budgetItemSelected } = budgetSlice.actions;

// selectors
const selectSelf = (state) => state;
export const getMonth = createDraftSafeSelector(
  selectSelf,
  (state) => state.budget.monthSelectedId
);

export const getSelectedBudgetItem = createDraftSafeSelector(
  selectSelf,
  (state) => state.budget.budgetItem
);
