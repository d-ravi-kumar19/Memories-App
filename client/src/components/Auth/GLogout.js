import { GoogleLogout } from "react-google-login";
import { Button } from "@mui/material";
import Icon from "./Icon";
import useStyles from "./styles";

const GOOGLE_CLIENT_ID ="113556075474-nned24vj9tggd31vuas3q7epg0vccii5.apps.googleusercontent.com";

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
