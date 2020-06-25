import React, { useContext } from "react";
import QuickList from "../../components/quick-list/quick-list.component";
import { UserContext } from "../../context/UserContext.context";
import { Grid } from "@material-ui/core";

const QuickMatch = () => {
  const [isLoggedIn] = useContext(UserContext);

  return (
    <div>
      {isLoggedIn ? (
        <Grid container>
          <Grid item xs={2} />
          <Grid container item xs={8}>
            <QuickList></QuickList>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default QuickMatch;
