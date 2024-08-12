// src/App.js

import React  from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Container} from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {Auth} from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
        <Route path='/' element={ <Navigate to='/posts' /> } />
          <Route path='/posts' exact element={ <Home /> } />
          <Route path='/posts/search' exact element={ <Home /> } />
          <Route path='/posts/:id' exact element={ <PostDetails /> } />     { /* post details path */ }
          <Route path='/auth' exact element={ (!user ? <Auth/> : <Navigate to='/posts' />) } />
        </Routes>

      </Container>  
    </Router>
  );
};

export default App;
