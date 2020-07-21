import React, { useState } from "react";
import UserCard from "../user-card/user-card.component";
import { useEffect } from "react";
import { Grid, Chip, TextField, Button } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./combo-list.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const ComboList = () => {
  const [modTaken, setModTaken] = useState([]);
  const [selectedMod, setSelectedMod] = useState([]);
  const [autoCompleteSelectedMod, setAutoCompleteSelectedMod] = useState([]);
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

  const containsExact = (mods) => {
    for (let mod of autoCompleteSelectedMod) {
      if (!mods.includes(mod)) return false;
    }
    return true;
  };

  const getUsers = (selectedMod) => {
    if (selectedMod.length === 0) {
      setSelectedMod([]);
      setUsers([]);
      return;
    }
    db.collection("user")
      .where("mods_taken", "array-contains-any", selectedMod)
      .get()
      .then((data) => {
        let newUsers = [];
        data.forEach((doc) => {
          if (
            doc.id !== username &&
            !friends.includes(doc.data().username) &&
            containsExact(doc.data().mods_taken)
          )
            newUsers.push(doc.data());
        });
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
                There {users.length === 1 ? "is" : "are"} {users.length} user
                {users.length > 1 ? "s " : " "} taking{" "}
                {selectedMod.map((mod) => mod + " ")} currently
              </Alert>
            </Grid>
          ) : selectedMod.length === 0 ? (
            <Grid item xs={12}>
              <Alert variant="filled" severity="info">
                Please select at least one module to start matching!
              </Alert>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Alert variant="filled" severity="error">
                Sorry, there is no user taking{" "}
                {selectedMod.map((mod) => mod + " ")} currently :(
              </Alert>
            </Grid>
          )}
        </Grid>
        <Grid item xs={3}>
          <div className="FieldBorder">
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
      <Grid item xs={10}>
        <Autocomplete
          fullWidth
          multiple
          id="tags-filled"
          options={modTaken.map((option) => option)}
          filterSelectedOptions
          onChange={(event, value) => setAutoCompleteSelectedMod(value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                color="primary"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <div className="FieldBorder">
              <TextField
                {...params}
                variant="outlined"
                label="Selected Modules"
                placeholder="Click Start to start matching!"
                color="primary"
              />
            </div>
          )}
        />
      </Grid>
      <Grid container item xs={2} spacing={1}>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color={"secondary"}
            onClick={(e) => {
              getUsers(autoCompleteSelectedMod);
            }}
            style={{
              borderRadius: "20px",
              margin: "1vh",
            }}
            size="medium"
          >
            Start
          </Button>
        </Grid>
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
                username={user.username}
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

export default ComboList;
