import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import LoginForm from "../Components/loginform.component";
import WelcomeContent from "../Components/welcomecontent.component";

const Login = () => {
  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid container item xs={12} sm={6}>
        <WelcomeContent></WelcomeContent>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={2} />
        <Grid container item xs={8}>
          <Grid item xs={12}>
            <LoginForm></LoginForm>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Copyright ©<Link href="/"> ModMate </Link>
              {new Date().getFullYear()}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Grid>
  );
};

export default Login;
