import { GoogleLogout } from "react-google-login";
import { Button } from "@mui/material";
import Icon from "./Icon";
import useStyles from "./styles";
import dotenv from 'dotenv'
dotenv.config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

function GLogout() {
  const classes = useStyles();

      const onSuccess = async (res) => {
      console.log("Logout Successful.");
      };

      return (
      <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            render={(renderProps) => (
                  <Button
                        variant="contained"
                        className={classes.googleButton}
                        color="primary"
                        fullWidth
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}
                        >
                  Google Sign out
                  </Button>
            )}
            onLogoutSuccess={onSuccess}
      />
      );
}

export default GLogout;
