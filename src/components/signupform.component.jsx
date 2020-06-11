import React from "react";
import { Grid, Typography, TextField, Button, Link } from "@material-ui/core";

const SignUpForm = () => {
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
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" fullWidth variant="contained" color="primary">
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
