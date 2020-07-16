import React, { useState } from "react";
import UserCard from "../user-card/user-card.component";
import { useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import "./quick-list.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const QuickList = () => {
  const [modTaken, setModTaken] = useState([]);
  const [selectedMod, setSelectedMod] = useState("");
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userData, setUserData] = useState([]);

  let user = auth.currentUser;
  let username = user.displayName;

  const getUserData = () => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        let data = doc.data();
        setUserData(data);
        setModTaken(data.mods_taken);
      });
    db.collection(`/user/${username}/other_info`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          setFriends(doc.data().friends);
        });
      });
  };

  const getUsers = () => {
    db.collection("user")
      .where("mods_taken", "array-contains", selectedMod)
      .get()
      .then((data) => {
        let newUsers = [];
        data.forEach((doc) => {
          if (doc.id !== username && !friends.includes(doc.data().username))
            newUsers.push(doc.data());
        });
        newUsers !== users && setUsers(newUsers);
      });
  };

  useEffect(() => {
    function getUsers() {
      db.collection("user")
        .where("mods_taken", "array-contains", selectedMod)
        .get()
        .then((data) => {
          let newUsers = [];
          data.forEach((doc) => {
            if (doc.id !== username && !friends.includes(doc.data().username))
              newUsers.push(doc.data());
          });
          newUsers !== users && setUsers(newUsers);
        });
    }

    getUsers();
  }, [selectedMod, username, users]);

  useEffect(getUserData, []);

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        style={{
          paddingTop: "5vh",
          paddingBottom: "1vh",
        }}
        spacing={1}
      >
        <Grid container item xs={9}>
          {users.length !== 0 ? (
            <Grid item xs={12}>
              <Alert variant="filled" severity="success">
                There {users.length === 1 ? "is" : "are"} {users.length} user
                {users.length > 1 ? "s " : " "} taking {selectedMod} currently
              </Alert>
            </Grid>
          ) : selectedMod === "" ? (
            <Grid item xs={12}>
              <Alert variant="filled" severity="info">
                Please select at least one module to start matching!
              </Alert>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Alert variant="filled" severity="error">
                Sorry, there is no user taking {selectedMod} currently :(
              </Alert>
            </Grid>
          )}
        </Grid>
        <Grid item xs={3}>
          <div className="FilterField">
            <TextField
              fullWidth
              variant="outlined"
              label="Filter by name"
              style={{
                margin: "1vh",
              }}
              size="small"
              color="primary"
              onChange={(e) => setFilter(e.target.value.toLowerCase())}
            />
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        style={{
          border: "solid #372f6c 2px",
          borderRadius: "20px",
          padding: "1vh",
        }}
      >
        {modTaken.map((mod) => (
          <Grid item xs={2}>
            <Button
              variant="contained"
              color={mod === selectedMod ? "secondary" : "primary"}
              onClick={(e) => {
                setSelectedMod(mod);
                getUsers();
              }}
              style={{
                marginTop: "1vh",
                marginBottom: "1vh",
                borderRadius: "20px",
                width: "7vw",
              }}
              size="medium"
            >
              {mod}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        item
        xs={12}
        spacing={2}
        style={{
          paddingTop: "5vh",
          paddingBottom: "5vh",
        }}
      >
        {users.map((user) =>
          user.name.toLowerCase().includes(filter) || filter === "" ? (
            <Grid item xs={3}>
              <UserCard
                avatar={user.avatar}
                name={user.name}
                residence={user.residence}
                nationality={user.nationality}
                major={user.major}
                career={user.career}
                userData={userData}
                isFriend={friends.includes(user.username)}
              />
            </Grid>
          ) : (
            <div></div>
          )
        )}
      </Grid>
    </Grid>
  );
};

export default QuickList;
