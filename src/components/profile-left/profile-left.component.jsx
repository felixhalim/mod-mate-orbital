import React from "react";
import "./profile-left.styles.css";
import BioOutput from "../bio-output/bio-output.component";
import NameOutput from "../name-output/name-output.component";
import UsernameOutput from "../username-output/username-output.component";
import Image from "../image/image.component";

const ProfileLeft = () => {
  return (
    <div className="wrapper">
      <div className="left">
        <div className="dummy">
          <Image></Image>
        </div>
        <h1>
          <NameOutput></NameOutput>
        </h1>
        <div className="above">
          <p>
            <UsernameOutput></UsernameOutput>
          </p>
        </div>
        <div className="line"></div>
        <div className="below">
          <BioOutput></BioOutput>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeft;
