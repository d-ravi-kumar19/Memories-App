// src/index.js

import React from "react";
import { Provider } from 'react-redux';       // to provide store to root
import { createRoot } from "react-dom/client";      
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';     
import reducers from "./reducers";    // importing all reducers
import App from "./App";    
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import './index.css';       // setting background with svg

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // for redux devtools

// creates store with all reducers
const store = createStore( 
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

// Log the store and initial state
// console.log("Redux store:", store);
// console.log("Initial state:", store.getState());

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>   
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

