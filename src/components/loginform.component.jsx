import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Link } from "@material-ui/core";
const { auth } = require("../firebase/index.firebase");

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmpty = (string) => {
    if (string.trim() === "") return true;
    else return false;
  };

  const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true;
    else return false;
  };

  const isNUSEmail = (email) => {
    const emailRegEx = /@u.nus.edu\s*$/;
    if (email.match(emailRegEx)) return true;
    else return false;
  };

  const validateSignInData = () => {
    if (isEmpty(email) || isEmpty(password)) {
      alert("Check your Form!");
    } else if (!isEmail(email) || !isNUSEmail(email)) {
      alert("Must be valid email address");
    }

    return;
  };
  const handleSignIn = (event) => {
    event.preventDefault();
    validateSignInData();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        window.location.replace("/profile");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  return (
    <Grid
      container
      style={{ paddingTop: "25vh", paddingBottom: "25vh" }}
      spacing={1}
    >
      <Grid item xs={12}>
        <Typography variant="h4">Login</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Link href="/signup" variant="body2">
          I don't have an account
        </Link>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
