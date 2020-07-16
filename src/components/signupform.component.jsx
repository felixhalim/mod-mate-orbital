import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Alert from "@material-ui/lab/Alert";
const { db, auth } = require("../firebase/index.firebase");
const axios = require("axios");
const countryList = require("country-list");

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [residence, setResidence] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nusmods, setNusmods] = useState("");
  const countries = countryList.getNames();
  const residences = [
    "Prince George's Park Residences",
    "Temasek Hall",
    "Eusoff Hall",
    "Raffles Hall",
    "Kent Ridge Hall",
    "Sheares Hall",
    "King Edward VII Hall",
    "PGP House",
    "Tembusu College",
    "College of Alice & Peter Tan",
    "Cinnamon College",
    "Residential College 4",
    "Ridge View Residential College",
    "Off Campus",
  ];
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const isEmpty = (string) => {
    if (string.trim() === "") return true;
    else return false;
  };

  const isEmail = (email) => {
    // eslint-disable-next-line
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true;
    else return false;
  };

  const isNUSEmail = (email) => {
    const emailRegEx = /@u.nus.edu\s*$/;
    if (email.match(emailRegEx)) return true;
    else return false;
  };

  const writeToDb = async () => {
    let modules = nusmods.split("&");
    let mod;
    let modsTaken = [];
    for (mod of modules) {
      if (mod.includes("?")) {
        mod = mod.split("?");
        mod = mod[1];
      }
      mod = mod.split("=", 1);
      await axios
        .get(`https://api.nusmods.com/v2/2020-2021/modules/${mod}.json`) // eslint-disable-next-line
        .then(function (response) {
          if (response.status === 200 && !modsTaken.includes(mod[0])) {
            modsTaken.push(mod[0]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    let basic_info = {
      career: "",
      faculty: "",
      major: "",
      mods_taken: modsTaken,
      name: name,
      nationality: nationality,
      residence: residence,
      username: username,
    };
    db.doc(`/user/${username}`).set(basic_info);

    let other_info = {
      request_sent: [],
      request_received: [],
      friends: [],
    };
    db.collection(`/user/${username}/other_info`).add(other_info);

    let private_info = {
      created_at: new Date().toISOString(),
      email: email,
      telegram_id: "",
    };
    db.collection(`/user/${username}/private_info`).add(private_info);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setLoading(true);
    let error = true;
    if (isEmpty(email)) {
      alert("Email must not be empty");
    } else if (!isEmail(email) || !isNUSEmail(email)) {
      alert("You must sign up using NUS email (@u.nus.edu)");
    } else if (
      isEmpty(name) ||
      isEmpty(username) ||
      isEmpty(nusmods) ||
      isEmpty(password)
    ) {
      alert("We detected error :( please check your form");
    } else if (password !== confirm) {
      alert("Please check your confirmation password");
    } else {
      error = false;
    }

    if (username.includes("/")) {
      alert("Username cannot contains /");
      error = true;
    } else {
      if (!error) error = false;
    }

    if (error) {
      setLoading(false);
      return;
    }

    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          alert("Sorry, this username is already taken :(");
        } else {
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(function (credential) {
              credential.user.updateProfile({
                displayName: username,
              });
              if (credential.user.emailVerified === false) {
                credential.user.sendEmailVerification().then(function () {
                  writeToDb();
                  alert(
                    "Account is successfully created! Please check your email for verification"
                  );
                });
              }
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;

              if (errorCode === "auth/weak-password") {
                alert("The password is too weak");
              } else if (error.code === "auth/email-already-in-use") {
                alert("This email already in use");
              } else {
                alert(errorMessage);
              }
              console.log(error);
            });
          return;
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Grid
      container
      style={{
        paddingTop: "10vh",
        paddingBottom: "10vh",
      }}
    >
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
          onChange={(e) => setName(toTitleCase(e.target.value))}
          autoFocus
          maxLength="17"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel id="nationality-label">Nationality</InputLabel>
          <Select
            labelId="nationality-label"
            id="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            label="Nationality"
          >
            {countries.map((country) => (
              <MenuItem value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel id="residence-label">Residence</InputLabel>
          <Select
            labelId="residence-label"
            id="residence"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
            label="Residence"
          >
            {residences.map((res) => (
              <MenuItem value={res}>{res}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
      </Grid>
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
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
          fullWidth
          id="nusmods"
          name="nusmods"
          label="NUSMods Timetable URL (Optional)"
          type="url"
          placeholder="https://nusmods.com/timetable/..."
          onChange={(e) => setNusmods(e.target.value.toUpperCase())}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleClickOpen}>
                <HelpOutlineIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleSignUp}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Sign Up
          {loading && (
            <CircularProgress size={20} style={{ position: "absolute" }} />
          )}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Link href="/" variant="body2">
          Already have an account? Log in here
        </Link>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"NUSMods Timetable URL"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert variant="filled" severity="info">
              Please follow this instruction to copy your NUSMods Timetable URL
            </Alert>
          </DialogContentText>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://media.giphy.com/media/J2DABVXvriVVYKJ4W3/giphy.gif"
              alt="NUSMods Timetable URL Copy + Paste Guide"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            I understand
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SignUpForm;
