import React, { useContext, useEffect } from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import LoginForm from "../components/loginform.component";
import WelcomeContent from "../components/welcomecontent.component";
import { UserContext } from "../context/UserContext.context";
const { auth } = require("../firebase/index.firebase");

const Login = () => {
  const [setLogin] = useContext(UserContext);

  const checkStatus = () => {
    auth.onAuthStateChanged(function (user) {
      if (user.emailVerified) {
        window.location.replace("/profile");
        setLogin(true);
      }
    });
  };

  useEffect(checkStatus, []);

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
