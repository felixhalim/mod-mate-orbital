import React, { useEffect, useRef } from "react";
import "./chit-chat.styles.css";
import Messages from "../chit-chat-messages/chit-chat-messages.component";

const ChitChat = (props) => {
  let friendname = props.buddy;

  const dummyRef = useRef(null);

  useEffect(() => {
    dummyRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="chatbox" id="chat-body">
      <div ref={dummyRef} />
      <div className="chat-structure">
        {props.list.map((item, index) => (
          <Messages key={index} message={item} friendname={friendname} />
        ))}
      </div>
    </div>
  );
};

export default ChitChat;
