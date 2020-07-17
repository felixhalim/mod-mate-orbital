import React, { useContext } from "react";
import "./chat-page.styles.css";
import ChatParticulars from "../../components/chat-particulars/chat-particulars.component";
import Chat from "../../components/chat/chat.component";
import ChatInfo from "../../components/chat-info/chat-info.component";
import { UserContext } from "../../context/UserContext.context";

const ChatPage = ({ match }) => {
  const [isLoggedIn] = useContext(UserContext);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <ChatParticulars friendName={match.params.id}></ChatParticulars>
          <ChatInfo friendName={match.params.id}></ChatInfo>
          <Chat friendName={match.params.id}></Chat>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ChatPage;
