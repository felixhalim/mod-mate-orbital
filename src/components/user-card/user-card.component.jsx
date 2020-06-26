import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import { School, Language, Chat, Book, Apartment } from "@material-ui/icons";

const UserCard = (props) => {
  const { residence, nationality, major, career } = props.userData;
  return (
    <Card
      style={{
        borderRadius: "20px",
        color: "white",
        backgroundColor: "#372f6c",
      }}
    >
      <CardActionArea>
        <CardMedia
          style={{
            height: 140,
            backgroundColor: "#3f3772",
          }}
          image="/"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container alignItems="center">
          <Grid container align="center" item xs={4}>
            <Grid item xs={12}>
              <IconButton disableRipple>
                <School htmlColor={career === props.career ? "white" : ""} />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <IconButton disableRipple>
                <Language
                  htmlColor={nationality === props.nationality ? "white" : ""}
                />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            item
            align="center"
            xs={4}
            style={{
              backgroundColor: "#8b66e0",
              borderRadius: "20px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <IconButton>
              <Chat fontSize="large" />
            </IconButton>
          </Grid>
          <Grid container align="center" item xs={4}>
            <Grid item xs={12}>
              <IconButton color="custom" disableRipple>
                <Apartment
                  htmlColor={residence === props.residence ? "white" : ""}
                />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <IconButton disableRipple>
                <Book htmlColor={major === props.major ? "white" : ""} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default UserCard;
