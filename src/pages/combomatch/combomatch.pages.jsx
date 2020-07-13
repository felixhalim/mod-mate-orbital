import React, { useContext } from "react";
import ComboList from "../../components/combo-list/combo-list.component";
import { UserContext } from "../../context/UserContext.context";
import { Grid } from "@material-ui/core";

const ComboMatch = () => {
  const [isLoggedIn] = useContext(UserContext);

  return (
    <div>
      {isLoggedIn ? (
        <Grid container>
          <Grid item xs={2} />
          <Grid container item xs={8}>
            <ComboList></ComboList>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ComboMatch;
