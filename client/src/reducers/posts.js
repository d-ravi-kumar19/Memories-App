// src/reducers/posts.js

import { FETCH_ALL, CREATE,DELETE,UPDATE,LIKE } from "../constants/actionTypes";
// this reducer called from actions
// checks action type and reduces the payload

const posts = (posts = [], action) => {
  // console.log('Reducer called with state:', posts);
  // console.log('Action:', action);

  switch (action.type) {
    case DELETE :
      const deleteId = action.payload;

      // Find the index of the post to delete
      posts["postMessages"].findIndex(post => post._id === deleteId);

      // Check if the post with the ID exists
      if (postIndex !== null) {
        // Use splice to remove the post at the index
        posts = posts["postMessages"].splice(postIndex, 1);
        console.log("Post deleted successfully!");
      } else {
        console.log("Post not found with ID:", deleteId);
      }
      console.log(posts)

      return posts
      
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    
    case UPDATE :
      const updatedPost = action.payload;
      // Find the index of the post to update
      const postIndex = posts.postMessages.findIndex(post => post._id === updatedPost._id);
    
      // Check if the post with the ID exists
      if (postIndex !== null) {
        // Update the post at the index with the new data (spread syntax)
        posts.postMessages[postIndex] = { ...updatedPost };
        console.log("Post updated successfully!");
      } else {
        console.log("Post not found with ID:", updatedPost._id);
      }
      console.log(posts.postMessages)
      return posts.postMessages;

    case FETCH_ALL:
      console.log(`FETCH_ALL action payload is passed`);
      return action.payload;        // returns payload directly

    case CREATE:
      console.log(`CREATE action payload is passed`);
      return [...posts, action.payload];  // add payload with existing one 

    default:
      return posts;
  }
};

export default posts;  // this will imported in entry point (index.js)

