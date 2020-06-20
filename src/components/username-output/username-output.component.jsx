import React from "react";
import "./username-output.styles.css";

const { auth } = require("../../firebase/index.firebase");

const UsernameOutput = () => {
  var user = auth.currentUser;
  const username = user.displayName;

  return (
    <div>
      <p className="username">{username}</p>
    </div>
  );
};
export default UsernameOutput;
