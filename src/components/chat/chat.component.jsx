import React, { useState, useEffect } from "react";
import "./chat.styles.css";
import ChitChat from "../chit-chat/chit-chat.component";

const { db, auth } = require("../../firebase/index.firebase");

const Chat = (props) => {
  let user = auth.currentUser;
  let username = user.displayName;

  const [isChatting, setIsChatting] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [interlocutor, setInterlocutor] = useState("");

  const getFriendName = () => {
    db.doc(`/user/${props.friendName}`)
      .get()
      .then((doc) => {
        setFriendName(doc.data().name);
      });
  };
  useEffect(getFriendName, []);

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
      {isChatting ? (
        <ChitChat buddy={props.friendName}></ChitChat>
      ) : (
        <div className="chat-welcome">
          <span className="chat-title">{`Congratulations, ${interlocutor} !`}</span>
          <span className="chat-desciption">
            Now you can chat with your new modmate, {`${friendName}`}!
            <br />
            <div className="error-effect">Let's start talking \ (•◡•) /</div>
          </span>
        </div>
      )}
    </div>
  );
};

export default Chat;
