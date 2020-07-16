import React, { useState, useEffect } from "react";
import "./chat-particulars.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const ChatParticulars = (props) => {
  const [friendImageUrl, setFriendImageUrl] = useState("");
  const [friendName, setFriendName] = useState("");
  const [friendBio, setFriendBio] = useState("");

  const getFriendData = () => {
    db.doc(`/user/${props.friendName}`)
      .get()
      .then((doc) => {
        setFriendImageUrl(doc.data().avatar);
      });
    db.doc(`/user/${props.friendName}`)
      .get()
      .then((doc) => {
        setFriendName(doc.data().name);
      });
    db.doc(`/user/${props.friendName}`)
      .get()
      .then((doc) => {
        setFriendBio(doc.data().bio);
      });
  };

  useEffect(getFriendData, []);

  return (
    <div className="wrapper">
      <div className="left">
        <div>
          <img
            className="friend-image"
            src={friendImageUrl || "https://via.placeholder.com/200x300"}
            alt="friend"
          />
        </div>
        <h1>{friendName}</h1>
        <div className="line"></div>
        <div className="below">{friendBio}</div>
      </div>
    </div>
  );
};

export default ChatParticulars;
