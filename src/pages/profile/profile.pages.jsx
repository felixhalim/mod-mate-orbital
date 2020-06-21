import React, { useContext } from "react";
import "./profile.styles.css";
import ProfileLeft from "../../components/profile-left/profile-left.component";
import ProfileRight from "../../components/profile-right/profile-right.component";
import ModuleList from "../../components/module-list/module-list.component";
import { UserContext } from "../../context/UserContext.context";

const Profile = () => {
  const [isLoggedIn] = useContext(UserContext);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="profile">
            <ProfileLeft></ProfileLeft>
            <ProfileRight></ProfileRight>
          </div>
          <div>
            <ModuleList></ModuleList>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
