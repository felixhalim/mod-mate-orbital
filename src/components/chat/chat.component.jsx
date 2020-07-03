import React, { useState, useEffect } from "react";
import "./chat.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const Chat = () => {
  let user = auth.currentUser;
  let username = user.displayName;

  const [friends, setFriends] = useState("anonymous");
  const [friendName, setFriendName] = useState("");
  const [interlocutor, setInterlocutor] = useState("");

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

  const getFriendName = () => {
    db.doc(`/user/${friends}`)
      .get()
      .then((doc) => {
        setFriendName(doc.data().name);
      });
  };
  useEffect(getFriendName, [friends]);

  const interlocutorName = () =>
    db
      .doc(`/user/${username}`)
      .get()
      .then((doc) => setInterlocutor(doc.data().name));
  useEffect(() => {
    interlocutorName();
  }, []);

  return (
    <div className="structure">
      <div className="chat-welcome">
        <span className="chat-title">{`Congratulations, ${interlocutor} !`}</span>
        <span className="chat-desciption">
          Now you can chat with your new modmate, {`${friendName}`}!
          <br />
          Let's start talking \ (•◡•) /
        </span>
      </div>
    </div>
  );
};

export default Chat;
