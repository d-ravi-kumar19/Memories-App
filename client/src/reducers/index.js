// src/components/reducers/index.js

import { combineReducers } from "redux";
import posts from "./posts";

// console.log(posts)
export default combineReducers({
  posts,
});
