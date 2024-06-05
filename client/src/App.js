// src/App.js

import React, { useEffect, useState } from "react";
import { AppBar, Container, Grid, Grow, Typography,Box } from "@mui/material";
import Posts from "./components/Posts/posts";
import Form from "./components/Form/form";
import memories from "./components/images/memories.png";
import useStyles from "./styles";
import { getPosts } from "./actions/posts";
import { useDispatch } from "react-redux";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles(); 
  const dispatch = useDispatch(); 

  useEffect(() => { 
    dispatch(getPosts());
  }, [currentId,dispatch]);   

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" width="100%">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60px" />
      </Box>
      </AppBar>
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={4}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId ={ setCurrentId} /> 
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId = {currentId}  setCurrentId ={ setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
