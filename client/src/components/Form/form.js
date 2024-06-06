// src/components/Form/form.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Paper,TextField ,Button} from "@mui/material";
import useStyles from "./styles";
import FileBase from 'react-file-base64'

import {createPost, updatePost} from '../../actions/posts'


const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState({creator: '', title:'', message : '', tags: '', selectedFile: ''});  // creating empty post data
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

  useEffect(() =>{
    if(post){
      setPostData(post)
    }
  },[post])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    if (currentId === 0) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
    }
    clear();
  };

  const clear = () =>{
    setCurrentId(0);
    setPostData({creator: '', title:'', message : '', tags: '', selectedFile: ''})
  }

  return (
  <Paper className={classes.paper}>
    <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit} >
      <Typography  variant="h6"> {currentId ? 'Editing':'Creating'} a Memory</Typography>
      <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}  onChange={(e) => setPostData({...postData, creator:e.target.value})}></TextField>
      <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}  onChange={(e) => setPostData({...postData, title:e.target.value})}></TextField>
      <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message}  onChange={(e) => setPostData({...postData, message:e.target.value})}></TextField>
      <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}  onChange={(e) => setPostData({...postData, tags:e.target.value.split(',')})}></TextField>
      <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
      </div>
      <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' fullWidth type='submit'  >Submit</Button> 
      <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear}>Clear</Button>
    </form>
  </Paper>
  );
};

export default Form;
