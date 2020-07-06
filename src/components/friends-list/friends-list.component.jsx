import React, { useState } from "react";
import UserCard from "../user-card/user-card.component";
import { useEffect } from "react";
import { Grid, Button, TextField, Box } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";

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

  const getFriends = () => {
    db.collection("user")
      .where("mods_taken", "array-contains", selectedMod)
      .get()
      .then((data) => {
        let newUsers = [];
        data.forEach((doc) => {
          if (doc.id !== username && friends.includes(doc.data().username)) {
            newUsers.push(doc.data());
          }
        });
        newUsers !== users && setUsers(newUsers);
      });
  };

  useEffect(() => {
    function getFriends() {
      db.collection("user")
        .where("mods_taken", "array-contains", selectedMod)
        .get()
        .then((data) => {
          let newUsers = [];
          data.forEach((doc) => {
            if (doc.id !== username && friends.includes(doc.data().username)) {
              newUsers.push(doc.data());
            }
          });
          newUsers !== users && setUsers(newUsers);
        });
    }

    getFriends();
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
          paddingBottom: "5vh",
        }}
      >
        <Grid container item xs={9}>
          <Box width={1} border="solid #372f6c 2px" borderRadius="20px">
            <Grid container item xs={12}>
              {modTaken.map((mod) => (
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color={mod === selectedMod ? "secondary" : "primary"}
                    onClick={(e) => {
                      setSelectedMod(mod);
                      getFriends();
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
          </Box>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            variant="filled"
            label="Filter by name"
            style={{
              margin: "1vh",
              border: "solid #372f6c 2px",
              borderRadius: "20px",
            }}
            size="small"
            color="primary"
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        {users.length !== 0 ? (
          <>
            <Grid item xs={12}>
              <Alert variant="filled" severity="success">
                Wowza! {users.length} of your friends are taking {selectedMod}{" "}
                too
              </Alert>
            </Grid>
            {users.map((friend) =>
              friend.name.toLowerCase().includes(filter) || filter === "" ? (
                <Grid item xs={3}>
                  <UserCard
                    name={friend.name}
                    residence={friend.residence}
                    nationality={friend.nationality}
                    major={friend.major}
                    career={friend.career}
                    userData={userData}
                    isFriend={friends.includes(friend.username)}
                  />
                </Grid>
              ) : (
                <div></div>
              )
            )}
          </>
        ) : selectedMod === "" ? (
          <Grid item xs={12}>
            <Alert variant="filled" severity="info">
              Please select one module to start!
            </Alert>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Alert variant="filled" severity="error">
              None of your friend is taking {selectedMod} currently. Don't
              worry, start matching!
            </Alert>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default FriendList;
