import React, { useContext, useState, useEffect } from "react";
import "./chat-page.styles.css";
import ChatParticulars from "../../components/chat-particulars/chat-particulars.component";
import Chat from "../../components/chat/chat.component";
import ChatInfo from "../../components/chat-info/chat-info.component";
import { UserContext } from "../../context/UserContext.context";

const { db, auth } = require("../../firebase/index.firebase");

const ChatPage = ({ match }) => {
  const [isLoggedIn] = useContext(UserContext);
  const [myFriends, setMyFriends] = useState([]);
  const [activeUser, setActiveUser] = useState("");

  const getActiveUserData = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        let LocalActiveUser = user.displayName;
        setActiveUser(user.displayName);

        db.collection(`user/${LocalActiveUser}/other_info`)
          .get()
          .then((data) => {
            data.forEach((doc) => {
              setMyFriends(doc.data().friends);
            });
          });
      }
    });
  };
  useEffect(getActiveUserData, []);

  let checkLink =
    match.params.id !== activeUser && myFriends.includes(match.params.id);

  return (
    <div>
      {isLoggedIn && checkLink ? (
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
