import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import express from 'express';

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find(); // returns all posts from db
    // console.log(postMessages[0].title); //log to print first post title
    // console.log(`Posts fetched successfully at ${new Date().toLocaleString()}`);

    res.status(200).json( postMessages );
  } catch (error) {
    console.error(
      `Error fetching posts at ${new Date().toLocaleString()}: ${error.message}`
    );
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPost = new PostMessage({ title, message, selectedFile, creator, tags })
  try {
    // save the newpost in db 
    await newPost.save();
    // console.log(
    //   `New post created successfully at ${new Date().toLocaleString()}`
    // );
    res.status(201).json(newPost);
  } catch (error) {
    console.error(
      `Error creating post at ${new Date().toLocaleString()}: ${error.message}`
    );
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id:_id } = req.params; // get from req url (/posts/:id)
  // post will receive from request
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    // check if id not valid
    res.status(404).send(`Oops! Post not found with ${_id}`);

  // updates in the db
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params; // get from req url (/posts/:id)
  if (!mongoose.Types.ObjectId.isValid(id))
    // check if id or not valid
    res.status(404).send(`Oops! Post not found with ${id}`);

  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Post deleted Successfully.." });
};


export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(updatedPost);
}

export default router;