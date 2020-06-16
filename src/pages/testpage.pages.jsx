import React, { useState, useEffect } from "react";
const { auth } = require("../firebase/index.firebase");

const TestPage = () => {
  const [isLoggedIn, setLogin] = useState(false);

  const checkStatus = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        if (!user.emailVerified) {
          alert("Fail. Please verify your email!");
          setLogin(false);
          window.location.replace("/");
        } else {
          alert("Login Successful");
          setLogin(true);
        }
      } else {
        alert("Fail. Please login!");
        setLogin(false);
        window.location.replace("/");
      }
    });
  };

  const logout = () => {
    auth
      .signOut()
      .then(function () {
        alert("Logout Successful");
        setLogin(false);
        window.location.replace("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(checkStatus, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Test Page</h1>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TestPage;
