import React, { useState, useEffect } from "react";
import "./chat.styles.css";
import ChitChat from "../chit-chat/chit-chat.component";
import Moment from "moment";

const { db, auth, realdb } = require("../../firebase/index.firebase");

const Chat = (props) => {
  let user = auth.currentUser;
  let username = user.displayName;

  const [isChatting, setIsChatting] = useState(false);

  const [friendName, setFriendName] = useState("");
  const [interlocutor, setInterlocutor] = useState("");

  //_____________________________________________________//
  const getFriendName = () => {
    db.doc(`/user/${props.friendName}`)
      .get()
      .then((doc) => {
        setFriendName(doc.data().name);
      });
  };
  useEffect(getFriendName, []);

  //_____________________________________________________//
  const interlocutorName = () =>
    db
      .doc(`/user/${username}`)
      .get()
      .then((doc) => setInterlocutor(doc.data().name));

  useEffect(() => {
    interlocutorName();
  }, []);

  //_____________________________________________________//
  let friendname = props.friendName;

  const [userName, setUserName] = useState(`${username}`);
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  const chatID = `${username}-${friendname}`;
  const messageRefFirst = realdb.ref().child(`${username}-${friendname}`);
  const messageRefLast = realdb.ref().child(`${friendname}-${username}`);

  const handleChange = (event) => {
    // event.preventDefault();
    setMessage(event.target.value);
  };

  function handleSend(event) {
    event.preventDefault();
    if (message) {
      let newItem = {
        userName: userName,
        message: message,
        date: Moment().calendar(),
      };
      messageRefFirst.push(newItem);
      messageRefLast.push(newItem);
      setMessage("");
    }
  }

  const listenMessages = () => {
    messageRefFirst.limitToLast(50).on("value", (snap) => {
      if (snap.val() !== null) {
        setIsChatting(true);
        setList(Object.values(snap.val()));
      } else {
        console.log(snap.val());
        setIsChatting(false);
      }
    });
  };

  useEffect(listenMessages, []);

  return (
    <div className="structure">
      {isChatting ? (
        <ChitChat buddy={props.friendName} list={list}></ChitChat>
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
      <form className="send" onSubmit={handleSend}>
        <input
          className="send-text"
          type="text"
          value={message}
          placeholder="Type message"
          onChange={handleChange}
        />
        <input
          className="send-button"
          type="image"
          src="https://www.materialui.co/materialIcons/content/send_white_192x192.png"
          alt="submit"
        ></input>
      </form>
    </div>
  );
};

export default Chat;
