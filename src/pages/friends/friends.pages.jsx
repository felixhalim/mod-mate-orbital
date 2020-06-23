import React, { useContext } from "react";
import "./friends.styles.css";
import FriendsList from "../../components/friends-list/friends-list.component";
import { UserContext } from "../../context/UserContext.context";

const Friends = () => {
  const [isLoggedIn] = useContext(UserContext);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1></h1>
          <div>
            <FriendsList></FriendsList>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Friends;
