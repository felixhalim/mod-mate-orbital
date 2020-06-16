import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Link } from "@material-ui/core";
const { db, auth } = require("../firebase/index.firebase");

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nusmods, setNusmods] = useState("");

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

  const writeToDb = () => {
    let basicFields = {
      notification: [],
      friend_request: [],
      friends: [],
      mod_taken: [],
    };
    db.collection("test").add({
      first: "Adios",
      last: "Lovelace",
      born: 1815,
    });
    db.doc(`/user/${username}`).set(basicFields);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    if (isEmpty(email)) {
      alert("Must not be empty");
      return;
    } else if (!isEmail(email) || !isNUSEmail(email)) {
      alert("Must be valid email address");
      return;
    } else if (
      isEmpty(name) ||
      isEmpty(username) ||
      isEmpty(nusmods) ||
      isEmpty(password)
    ) {
      alert("Check your form!");
      return;
    } else if (password !== confirm) {
      alert("Password must be the same!");
      return;
    }

    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          alert("This username is already taken");
        } else {
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(function (credential) {
              if (credential.user.emailVerified === false) {
                credential.user.sendEmailVerification().then(function () {
                  alert("Please verify your email");
                  writeToDb();
                });
              }
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;

              if (errorCode === "auth/weak-password") {
                alert("The password is too weak.");
              } else if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
              } else {
                alert(errorMessage);
              }
              console.log(error);
            });
        }
      });
  };

  return (
    <Grid container style={{ paddingTop: "10vh", paddingBottom: "10vh" }}>
      <Grid item xs={12}>
        <Typography variant="h4">Ready to meet new people?</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          name="name"
          label="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          name="username"
          label="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="NUS Email Address"
          type="text"
          placeholder="e1234567@u.nus.edu"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="confirm"
          name="confirm"
          label="Confirmation Password"
          type="password"
          onChange={(e) => setConfirm(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nusmods"
          name="nusmods"
          label="NUSMods URL"
          type="url"
          placeholder="https://nusmods.com/timetable/..."
          onChange={(e) => setNusmods(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleSignUp}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Link href="/" variant="body2">
          Already have an account? Log in here
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
