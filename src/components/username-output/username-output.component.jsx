import React from "react";
import "./username-output.styles.css";

const firebase = require("firebase");

const UsernameOutput = () => {
  var user = firebase.auth().currentUser;
  const username = user.displayName;

  return (
    <div>
      <p className="username">{username}</p>
    </div>
  );
};
export default UsernameOutput;
