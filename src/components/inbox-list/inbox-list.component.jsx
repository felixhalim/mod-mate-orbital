import React, { useState } from "react";
import RequestCard from "../request-card/request-card.component";
import { useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import "./inbox-list.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const InboxList = () => {
  const [filter, setFilter] = useState("");
  const [reqUsernameList, setReqUsernameList] = useState([]);
  const [friendRequestsData, setFriendRequestsData] = useState([]);
  const [userData, setUserData] = useState([]);

  let user = auth.currentUser;
  let username = user.displayName;

  const getUserFriendReqList = () => {
    db.collection(`/user/${username}/other_info`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          setReqUsernameList(doc.data().request_received);
        });
      });
  };

  const getFriendsRequests = () => {
    let reqList = [];
    reqUsernameList.map((request) => {
      db.doc(`/user/${request}`)
        .get()
        .then((doc) => {
          reqList.push(doc.data());
        });
    });
    setFriendRequestsData(reqList);
  };

  const getUserData = () => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        let data = doc.data();
        setUserData(data);
      });
  };

  useEffect(getUserFriendReqList, []);
  useEffect(getFriendsRequests, [reqUsernameList]);
  useEffect(getUserData, [friendRequestsData]);

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
          <Grid item xs={12}>
            <Alert variant="filled" severity="info">
              You have {friendRequestsData.length} friend request
              {friendRequestsData.length > 1 ? "s " : " "}
            </Alert>
          </Grid>
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
        spacing={2}
        style={{
          paddingTop: "5vh",
          paddingBottom: "5vh",
        }}
      >
        {friendRequestsData.map((request) =>
          request.name.toLowerCase().includes(filter) || filter === "" ? (
            <Grid item xs={3}>
              <RequestCard
                avatar={request.avatar}
                name={request.name}
                residence={request.residence}
                nationality={request.nationality}
                major={request.major}
                career={request.career}
                username={request.username}
                userData={userData}
                isFriend={false}
                modulesTaken={request.mods_taken}
              />
            </Grid>
          ) : (
            <div>
              <h1>kosong</h1>
            </div>
          )
        )}
      </Grid>
    </Grid>
  );
};

export default InboxList;
