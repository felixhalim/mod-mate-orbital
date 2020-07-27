import React from "react";
import { Grid, Typography } from "@material-ui/core";

const WelcomeContent = () => {
  return (
    <Grid
      container
      style={{
        paddingTop: "30vh",
        paddingBottom: "30vh",
        paddingRight: "10vh",
        paddingLeft: "10vh",
        background: "#8477D2",
        color: "white",
      }}
    >
      <Grid item xs={12} align="right">
        <Typography variant="h3">
          <b>Welcome to ModMate!</b>
        </Typography>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={11} align="right">
        <Typography variant="h6" align="right">
          Discover endless possibilities of mutual connection for YOU with your
          module cohorts at your fingertips in only just a blink!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WelcomeContent;
