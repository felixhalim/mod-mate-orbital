import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Tooltip,
  Modal,
  Backdrop,
  Fade,
  Button,
  Chip,
} from "@material-ui/core";
import {
  Timeline,
  Language,
  Book,
  Home,
  Check,
  Delete,
} from "@material-ui/icons";
import "../particulars/cards.styles.css";

const { firebase, db } = require("../../firebase/index.firebase");

const UserCard = (props) => {
  const { username, residence, nationality, major, career } = props.userData;
  const [open, setOpen] = useState(false);

  const handleAddFriend = async () => {
    await db
      .collection(`/user/${props.username}/other_info`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          db.doc(`/user/${props.username}/other_info/${doc.id}`).update({
            friends: firebase.firestore.FieldValue.arrayUnion(username),
          });
        });
      });
    await db
      .collection(`/user/${username}/other_info`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          db.doc(`/user/${username}/other_info/${doc.id}`).update({
            friends: firebase.firestore.FieldValue.arrayUnion(props.username),
          });
        });
      });
    handleRejectFriend();
  };

  const handleRejectFriend = async () => {
    await db
      .collection(`/user/${props.username}/other_info`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          db.doc(`/user/${props.username}/other_info/${doc.id}`).update({
            request_sent: firebase.firestore.FieldValue.arrayRemove(username),
            request_received: firebase.firestore.FieldValue.arrayRemove(
              props.username
            ),
          });
        });
      });
    await db
      .collection(`/user/${username}/other_info`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          db.doc(`/user/${username}/other_info/${doc.id}`).update({
            request_received: firebase.firestore.FieldValue.arrayRemove(
              props.username
            ),
            request_sent: firebase.firestore.FieldValue.arrayRemove(username),
          });
        });
      });
    window.location.replace("/inbox");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const maxTextLength = 10;

  return (
    <>
      <Card
        alt={props.name}
        style={{
          maxWidth: 345,
          borderRadius: "20px",
          color: "white",
          backgroundColor: "#372f6c",
        }}
      >
        <CardActionArea onClick={handleOpen} alt={props.name}>
          <CardMedia
            style={{
              height: 0,
              paddingTop: "56.25%",
              backgroundColor: "#3f3772",
            }}
            image={props.avatar}
            title={props.name}
          />
          <CardContent>
            <Typography align="center" variant="h5">
              {truncate(props.name, maxTextLength)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ marginBottom: "1vh" }}>
          <Grid container alignItems="center">
            <Grid container align="center" item xs={12}>
              <Grid item xs={3}>
                <Tooltip
                  title={props.career || "Unknown"}
                  arrow
                  placement="top"
                >
                  <IconButton disableRipple>
                    <Timeline
                      htmlColor={career === props.career ? "white" : ""}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip
                  title={props.nationality || "Unknown"}
                  arrow
                  placement="top"
                >
                  <IconButton disableRipple>
                    <Language
                      htmlColor={
                        nationality === props.nationality ? "white" : ""
                      }
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip
                  title={props.residence || "Unknown"}
                  arrow
                  placement="top"
                >
                  <IconButton color="custom" disableRipple>
                    <Home
                      htmlColor={residence === props.residence ? "white" : ""}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title={props.major || "Unknown"} arrow placement="top">
                  <IconButton disableRipple>
                    <Book htmlColor={major === props.major ? "white" : ""} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={1} style={{ margin: "1vh" }}>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  style={{ backgroundColor: "#EC799A" }}
                  startIcon={<Delete />}
                  onClick={handleRejectFriend}
                >
                  Reject
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  color="secondary"
                  startIcon={<Check />}
                  onClick={handleAddFriend}
                >
                  Accept
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card
            style={{
              maxWidth: 345,
              borderRadius: "20px",
              color: "white",
              backgroundColor: "#372f6c",
              outline: 0,
            }}
          >
            <CardMedia
              style={{
                height: 0,
                paddingTop: "56.25%",
                backgroundColor: "#3f3772",
              }}
              image={props.avatar}
              title={props.name}
            />
            <CardContent>
              <Grid container>
                <Grid item xs={1} />
                <Grid container item xs={10} spacing={1}>
                  <Grid item xs={12}>
                    <Typography align="center" gutterBottom variant="h5">
                      {props.name}
                    </Typography>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={1}>
                      <Timeline
                        fontSize="inherit"
                        style={{ marginRight: "1vw" }}
                      />
                    </Grid>
                    <Grid item xs={11}>
                      <Typography align="left" variant="subtitle">
                        {props.career || "Unknown"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={1}>
                      <Book fontSize="inherit" style={{ marginRight: "1vw" }} />
                    </Grid>
                    <Grid item xs={11}>
                      <Typography align="left" variant="subtitle">
                        {props.major || "Unknown"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={1}>
                      <Language
                        fontSize="inherit"
                        style={{ marginRight: "1vw" }}
                      />
                    </Grid>
                    <Grid item xs={11}>
                      <Typography align="left" variant="subtitle">
                        {props.nationality || "Unknown"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={1}>
                      <Home fontSize="inherit" style={{ marginRight: "1vw" }} />
                    </Grid>
                    <Grid item xs={11}>
                      <Typography align="left" variant="subtitle">
                        {props.residence || "Unknown"}
                      </Typography>
                    </Grid>
                  </Grid>
                  {props.isFriend ? (
                    <Grid container item xs={12} justify="center">
                      {props.modulesTaken.map((mod) => (
                        <Chip
                          color="default"
                          size="small"
                          label={mod}
                          style={{ margin: "0.5vh" }}
                        />
                      ))}
                    </Grid>
                  ) : (
                    <div></div>
                  )}
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </CardContent>
            <CardActions
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2vh",
                marginLeft: "1vh",
                marginRight: "1vh",
              }}
            >
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "#EC799A" }}
                  startIcon={<Delete />}
                  onClick={handleRejectFriend}
                >
                  Reject
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  startIcon={<Check />}
                  onClick={handleAddFriend}
                >
                  Accept
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default UserCard;
