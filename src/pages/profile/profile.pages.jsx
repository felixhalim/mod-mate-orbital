import React, { useState, useEffect } from "react";
import "./profile.styles.css";
import Stranger from "../stranger/stranger.component";
import ModuleList from "../../components/module-list/module-list.component";

const { auth } = require("../../firebase/index.firebase");

const Profile = () => {
  const [isLoggedIn, setLogin] = useState(false);

  const checkStatus = () => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        if (!user.emailVerified) {
          alert("Please kindly verify your email to access this page :)");
          setLogin(false);
          await user.sendEmailVerification().then(function () {
            alert("We just sent another verification email");
          });
          window.location.replace("/");
        } else {
          // alert("Login Successful");
          setLogin(true);
        }
      } else {
        alert("Please kindly log in or sign up to access this page :)");
        setLogin(false);
        window.location.replace("/");
      }
    });
  };
  useEffect(checkStatus, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="profile">
            <div>profile left</div>
            <div>profile right</div>
          </div>
          <div>
            <ModuleList></ModuleList>
          </div>
        </div>
      ) : (
        <Stranger></Stranger>
      )}
    </div>
  );
};

export default Profile;
