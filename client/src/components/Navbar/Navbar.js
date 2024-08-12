import React,{ useState,useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Button, Box, Avatar } from "@mui/material";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import memories from "../../images/memories.png";
import useStyles from "./styles";


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); 
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate()
  const location = useLocation()

  // console.log(user.result)

  const logout = () =>{
    dispatch({ type: "LOGOUT" })
    navigate('/')
    setUser(null)
  }
  
  useEffect(() =>{
    // const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    <AppBar className={classes.appBar} display="flex" position="static" color="inherit">
      <Box display="flex" >
      <Link to='/' className={classes.brandContainer} >
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60px" />
      </Link>
      
      <Toolbar className={classes.toolbar} >  
      {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button className={classes.logout} color="secondary" variant="contained" onClick={logout}>Log out</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
        )}
      </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
