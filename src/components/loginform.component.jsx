import React from "react";
import { Grid, Typography, TextField, Button, Link } from "@material-ui/core";

const LoginForm = () => {
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
          id="password"
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" fullWidth variant="contained" color="primary">
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
