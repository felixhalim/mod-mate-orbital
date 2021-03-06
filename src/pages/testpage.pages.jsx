import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext.context";
const { auth } = require("../firebase/index.firebase");

const TestPage = () => {
  const [isLoggedIn, setLogin] = useContext(UserContext);

  const checkStatus = () => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        if (!user.emailVerified) {
          alert("Fail. Please verify your email!");
          setLogin(false);
          await user.sendEmailVerification().then(function () {
            alert("We just sent another verification email");
          });
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
