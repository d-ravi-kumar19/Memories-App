// src/components/reducers/index.js

import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";

// console.log(auth)

export default combineReducers({
  posts,
  auth,
});
