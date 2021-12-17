import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import {
    mybeerSlice,
    userSlice, 
    suggestSlice, 
    beerSlice, 
    categorySlice,
    reviewSlice,
  } from "./reducer/SliceIndex";

export const history = createBrowserHistory();

const reducer = combineReducers({
  mybeer: mybeerSlice.reducer,
  category: categorySlice.reducer,
  beer: beerSlice.reducer,
  suggest: suggestSlice.reducer,
  review: reviewSlice.reducer,
  user: userSlice.reducer,
  router: connectRouter(history),
});

const middlewares = [];

const env = process.env.NODE_ENV;

export const store = configureStore({
  reducer,
  middleware: [...middlewares, ...getDefaultMiddleware()],
  devTools: env !== "production",
});
