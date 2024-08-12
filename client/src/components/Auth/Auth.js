import React, { useEffect, useState } from 'react'
import { Container, Avatar, Typography,Paper,Grid, Button} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import useStyles from './styles'
import Input from './Input'
import GLogin from './GLogin';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth.js'

import {gapi} from 'gapi-script'
import { useNavigate } from 'react-router-dom';
import dotenv from 'dotenv'
dotenv.config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;


// dotenv.config()
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export const Auth = () => {
      const [formData, setFormData] = useState(initialState);
      const [isSignUp, setIsSignUp] = useState(false);
      const classes = useStyles()
      const dispatch = useDispatch();
      const navigate = useNavigate()

      const [showPassword, setShowPassword] = useState(false);
      const handleShowPassword = () => setShowPassword(!showPassword);

      const handleSubmit = (e) => {
            e.preventDefault(); // to prevent refreshing the page on form submit
      
                  if (isSignUp)   {
                  dispatch(signup(formData, navigate));
                  }   else {
                  dispatch(signin(formData, navigate));
                  }   
            }

      const handleChange = (e)=>{
            e.preventDefault();
            setFormData({ ...formData, [e.target.name]: e.target.value})
      }
      

      const switchMode = (e) =>{
            e.preventDefault();
            setIsSignUp((prevIsSignUp) => !prevIsSignUp)
            setShowPassword(false)
      }
      useEffect(() => {
            function start(){
                  gapi.client.init({
                        clientId : GOOGLE_CLIENT_ID,
                  })
            }
            gapi.load('client:auth2',start);
      },[]);

      return (
      <Container component="main" maxWidth ="xs">
      <Paper className={classes.paper} elevation={3}>
            <Avatar>
                  <PersonIcon/>
            </Avatar>
            <Typography variant='h5'  >{isSignUp ? "Sign Up" : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                        { isSignUp && (
                              <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                              </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? 'text' : 'password' } handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In' }
                  </Button>
                  <GLogin/>
                  {/* <GLogout/> */}


                  <Grid container justify="flex-start">
                        <Grid item>
                              <Button onClick={switchMode}>
                                    {
                                          isSignUp ? "Already have an account? Sign Up":
                                          "Don't have an account? Sign In"
                                    }
                              </Button>
                        </Grid>
                  </Grid>
            </form>

      </Paper>
    </Container>
  )
}
