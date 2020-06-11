import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import SignUpForm from "../components/signupform.component";
import WelcomeContent from "../components/welcomecontent.component";

const SignUp = () => {
  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid container item xs={12} sm={6}>
        <WelcomeContent></WelcomeContent>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={2} />
        <Grid container item xs={8}>
          <Grid item xs={12}>
            <SignUpForm></SignUpForm>
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

export default SignUp;
