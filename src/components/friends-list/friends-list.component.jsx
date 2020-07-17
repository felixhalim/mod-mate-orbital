import React, { useState } from "react";
import UserCard from "../user-card/user-card.component";
import { useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import "./friends-list.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const FriendList = () => {
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

  const getFriends = (selectedMod) => {
    let newUsers = [];
    db.collection("user")
      .where("mods_taken", "array-contains", selectedMod)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          if (doc.id !== username && friends.includes(doc.data().username)) {
            newUsers.push(doc.data());
          }
        });
      })
      .finally(async () => {
        for (let usr of newUsers) {
          await db
            .collection(`/user/${usr.username}/private_info/`)
            .get()
            .then((data) => {
              data.forEach((doc) => {
                usr.tele_id = doc.data().telegram_id;
              });
            });
        }
        newUsers !== users && setUsers(newUsers);
        setSelectedMod(selectedMod);
      });
  };

  useEffect(() => {}, [users]);
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
                Wowza! {users.length} of your friend
                {users.length > 1 ? "s " : " "}{" "}
                {users.length === 1 ? "is" : "are"} taking {selectedMod} too
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
                getFriends(mod);
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
        {users.map((friend) =>
          friend.name.toLowerCase().includes(filter) || filter === "" ? (
            <Grid item xs={3}>
              <UserCard
                avatar={friend.avatar}
                name={friend.name}
                residence={friend.residence}
                nationality={friend.nationality}
                major={friend.major}
                career={friend.career}
                username={friend.username}
                userData={userData}
                isFriend={friends.includes(friend.username)}
                modulesTaken={friend.mods_taken}
                tele_id={friend.tele_id}
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

export default FriendList;
