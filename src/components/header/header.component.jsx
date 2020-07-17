import React, { useContext, useEffect } from "react";
import "./header.styles.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.context";
import Stranger from "../../pages/stranger/stranger.component";
const { auth } = require("../../firebase/index.firebase");

const Header = () => {
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
          setLogin(true);
          // alert("Login Successful");
        }
      } else {
        // alert("Please login!");
        setLogin(false);
        auth
          .signOut()
          .then(function () {
            setLogin(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  const logout = () => {
    auth
      .signOut()
      .then(function () {
        window.location.replace("/");
        setLogin(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(checkStatus, []);

  return (
    <div>
      {isLoggedIn ? (
        <nav>
          <script src="https://kit.fontawesome.com/a076d05399.js"></script>
          <input type="checkbox" id="check" />
          <label for="check">
            <i class="fas fa-bars" id="btn"></i>
            <i class="fas fa-times" id="cancel"></i>
          </label>
          <Link to="/profile">
            <h1 className="logo-style">ModMate</h1>
          </Link>
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
              alt="sign-out"
            />
          </ul>
        </nav>
      ) : (
        <Stranger></Stranger>
      )}
    </div>
  );
};

export default Header;
