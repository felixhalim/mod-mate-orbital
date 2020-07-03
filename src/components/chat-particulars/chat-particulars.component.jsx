import React, { useState, useEffect } from "react";
import "./chat-particulars.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const ChatParticulars = () => {
  let user = auth.currentUser;
  let username = user.displayName;

  const [friends, setFriends] = useState("anonymous");
  const [friendImageUrl, setFriendImageUrl] = useState("");
  const [friendName, setFriendName] = useState("");
  const [friendBio, setFriendBio] = useState("");

  const getUserData = () => {
    db.collection(`/user/${username}/other_info`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          setFriends(doc.data().friends[1]);
        });
      });
  };
  useEffect(getUserData, []);

  const getFriendImage = () => {
    db.doc(`/user/${friends}`)
      .get()
      .then((doc) => {
        setFriendImageUrl(doc.data().avatar);
      });
  };
  useEffect(() => {
    getFriendImage();
  }, [friends, friendImageUrl]);

  const getFriendName = () => {
    db.doc(`/user/${friends}`)
      .get()
      .then((doc) => {
        setFriendName(doc.data().name);
      });
  };
  useEffect(() => {
    getFriendName();
  }, [friends, friendName]);

  const getFriendBio = () => {
    db.doc(`/user/${friends}`)
      .get()
      .then((doc) => {
        setFriendBio(doc.data().bio);
      });
  };
  useEffect(() => {
    getFriendBio();
  }, [friends, friendBio]);

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
