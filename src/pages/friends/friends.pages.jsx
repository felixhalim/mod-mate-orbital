import React, { useContext } from "react";
import FriendsList from "../../components/friends-list/friends-list.component";
import { UserContext } from "../../context/UserContext.context";

import { Grid } from "@material-ui/core";

const Friends = () => {
  const [isLoggedIn] = useContext(UserContext);

  return (
    <div>
      {isLoggedIn ? (
        <Grid container>
          <Grid item xs={2} />
          <Grid container item xs={8}>
            <FriendsList></FriendsList>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Friends;
