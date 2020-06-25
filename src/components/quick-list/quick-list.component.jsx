import React, { useState } from "react";
import UserCard from "../user-card/user-card.component";
import { useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core/";
const { db, auth } = require("../../firebase/index.firebase");

const QuickList = () => {
  const [modTaken, setModTaken] = useState([]);
  const [selectedMod, setSelectedMod] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  let user = auth.currentUser;
  let username = user.displayName;

  const getUserMods = () => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        let data = doc.data();
        setModTaken(data.mods_taken);
      });
  };

  const getUsers = () => {
    db.collection("user")
      .where("mods_taken", "array-contains", selectedMod)
      .get()
      .then((data) => {
        let newUsers = [];
        data.forEach((doc) => {
          if (doc.id !== username) {
            newUsers.push(doc.data());
          }
        });
        newUsers !== users && setUsers(newUsers);
      });
  };

  useEffect(() => {
    getUsers();
  }, [selectedMod]);

  useEffect(getUserMods, []);

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
        <Grid item xs={9}>
          {modTaken.map((mod) => (
            <Button
              variant="contained"
              color={mod === selectedMod ? "secondary" : "primary"}
              onClick={(e) => {
                setSelectedMod(mod);
                getUsers();
              }}
              style={{ margin: "1vh" }}
              size="medium"
            >
              {mod}
            </Button>
          ))}
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            variant="outlined"
            id="standard-search"
            label="Search here"
            type="search"
            style={{ margin: "1vh" }}
            size="small"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        {users.map((user) => (
          <Grid item xs={3}>
            <UserCard name={user.name} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default QuickList;
