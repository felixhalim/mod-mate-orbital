import React, { useState, useEffect } from "react";
import "./header.styles.css";
import { Link } from "react-router-dom";
const { auth } = require("../../firebase/index.firebase");

const Header = () => {
  const [isLoggedIn, setLogin] = useState(false);

  const checkStatus = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        if (!user.emailVerified) {
          // alert("Fail. Please verify your email!");
          setLogin(false);
          window.location.replace("/");
        } else {
          // alert("Login Successful");
          setLogin(true);
        }
      } else {
        // alert("Fail. Please login!");
        setLogin(false);
        window.location.replace("/");
      }
    });
  };

  const logout = () => {
    auth
      .signOut()
      .then(function () {
        // alert("Logout Successful");
        setLogin(false);
        window.location.replace("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(checkStatus, []);
  return (
    <nav>
      {isLoggedIn ? (
        <div>
          <input type="checkbox" id="check" />
          <label for="check">
            <i class="fas fa-bars" id="btn"></i>
            <i class="fas fa-times" id="cancel"></i>
          </label>
          <h1 href="/quick-match">ModMate</h1>
          <ul>
            <li>
              <Link to="/quick-match" activeClassName="active">
                Quick Match
              </Link>
            </li>
            <li>
              <Link to="/combo-match" activeClassName="active">
                Combo Match
              </Link>
            </li>
            <li>
              <Link to="/friends" activeClassName="active">
                Friends
              </Link>
            </li>
            <li>
              <Link to="/inbox" activeClassName="active">
                Inbox
              </Link>
            </li>
            <li>
              <Link to="/profile" activeClassName="active">
                Profile
              </Link>
            </li>
            <img
              className="logout-button"
              src="https://www.materialui.co/materialIcons/action/exit_to_app_white_48x48.png"
              onClick={logout}
            />
          </ul>
          <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
          <script
            type="text/javascript"
            src="C:\Users\Dipasukha\Projects\Trial3\view\src\pages\Header\Header-code.js"
          ></script>
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  );
};

export default Header;
