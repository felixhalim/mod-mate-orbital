import React, { useState } from "react";
import UserCard from "../user-card/user-card.component";
import { useEffect } from "react";
import { Grid, Button, TextField, Box } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";

const { db, auth } = require("../../firebase/index.firebase");

const QuickList = () => {
  const [modTaken, setModTaken] = useState([]);
  const [selectedMod, setSelectedMod] = useState("");
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);

  let user = auth.currentUser;
  let username = user.displayName;

  const getUserMods = () => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        let data = doc.data();
        setUserData(data);
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
                There are {users.length} users taking {selectedMod} currently
              </Alert>
            </Grid>
            {users.map((user) =>
              user.name.toLowerCase().includes(filter) || filter === "" ? (
                <Grid item xs={3}>
                  <UserCard
                    name={user.name}
                    residence={user.residence}
                    nationality={user.nationality}
                    major={user.major}
                    career={user.career}
                    userData={userData}
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
              Please select one module to start matching!
            </Alert>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Alert variant="filled" severity="error">
              Sorry, there are no user taking {selectedMod} currently :(
            </Alert>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default QuickList;