// import { GoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Button } from "@mui/material";
import Icon from "./Icon";
import useStyles from "./styles";
import { useDispatch } from 'react-redux';
import dotenv from 'dotenv'
dotenv.config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

function GLogin() {
      const classes = useStyles();
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const googleSuccess = async (res) => {
            console.log('Login Successful.')
            const result = res?.profileObj;
            const token = res?.tokenId;
            // console.table(result,token)
            
            try {
                  dispatch({type:'AUTH', data:{ result, token}})
                  navigate('/');
            } catch (error) {
                  console.log(error)
            }
      };

      const googleFailure = (error) => {
      console.log(error);
      console.log("Google Sign in was unsuccessful. Try Later");
      };

      return (
      <GoogleOAuthProvider clientId={ GOOGLE_CLIENT_ID }>
            <GoogleLogin
                clientId={ GOOGLE_CLIENT_ID }
                render={ (renderProps) => (
                    <Button 
                        variant='contained' 
                        className={classes.googleButton} 
                        color='primary' 
                        fullWidth 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled} 
                        startIcon={<Icon />}
                    >
                        Google Sign In
                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
            />
        </GoogleOAuthProvider>

    );
}

export default GLogin;
