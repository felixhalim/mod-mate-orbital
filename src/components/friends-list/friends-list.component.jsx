import React, { useState } from "react";
import FriendCard from "../friend/friend.component";
import "./friends-list.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  let user = auth.currentUser;
  let username = user.displayName;

  db.doc(`/user/${username}`)
    .get()
    .then((doc) => {
      let data = doc.data();
      setFriends(data.friends);
    });

  return (
    <div>
      <ul className="friends-list">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
