import React, { useContext } from "react";
import "./chat-page.styles.css";
import ChatParticulars from "../../components/chat-particulars/chat-particulars.component";
import Chat from "../../components/chat/chat.component";
import ChatInfo from "../../components/chat-info/chat-info.component";
import { UserContext } from "../../context/UserContext.context";

const ChatPage = () => {
  const [isLoggedIn] = useContext(UserContext);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <ChatParticulars></ChatParticulars>
          <ChatInfo></ChatInfo>
          <Chat></Chat>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ChatPage;
