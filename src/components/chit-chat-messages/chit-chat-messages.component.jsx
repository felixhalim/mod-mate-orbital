import React, { useState } from "react";
import "./chit-chat-messages.styles.css";
const { auth } = require("../../firebase/index.firebase");

const Messages = (props) => {
  let user = auth.currentUser;
  let username = user.displayName;

  return (
    <div
      className={
        props.message.userName === username ? "message-right" : "message-left"
      }
    >
      <span className="message-content">{props.message.message}</span>
      <br />
      <span className="message-author">{props.message.date}</span>
    </div>
  );
};

export default Messages;
