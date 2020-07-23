import React, { useContext } from "react";
import InboxList from "../../components/inbox-list/inbox-list.component";
import { UserContext } from "../../context/UserContext.context";

import { Grid } from "@material-ui/core";

const Inbox = () => {
  const [isLoggedIn] = useContext(UserContext);

  return (
    <div>
      {isLoggedIn ? (
        <Grid container>
          <Grid item xs={2} />
          <Grid container item xs={8}>
            <InboxList></InboxList>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Inbox;
