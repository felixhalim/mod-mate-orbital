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
        <Typography variant="h3">Welcome to ModMate</Typography>
      </Grid>
      <Grid item xs={12} align="right">
        <Typography variant="subtitle" align="right">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quas
          aspernatur qui incidunt inventore ullam harum atque temporibus
          accusamus aliquam, facilis sit repellat odio fugiat quis dignissimos
          quasi, voluptatum okay.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WelcomeContent;
