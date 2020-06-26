import React, { useState } from "react";
import "./profile-left.styles.css";
import BioOutput from "../bio-output/bio-output.component";
import NameOutput from "../name-output/name-output.component";
import UsernameOutput from "../username-output/username-output.component";
import axios from "axios";

const ProfileLeft = () => {
  const [picture, setPicture] = useState({ selectedFile: null });

  const fileChangedHandler = (event) => {
    setPicture({ selectedFile: event.target.files[0] });
  };

  const uploadHandler = () => {
    axios.post("my-domain.com/file-upload", picture.selectedFile);
  };

  return (
    <div className="wrapper">
      <div className="left">
        <div className="dummy">
          <img
            className="image"
            src="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200605104706-cristiano-ronaldo-tease.jpg"
            alt="user"
            width="100"
          />
          <div className="middle">
            <img
              className="upload-photo"
              src="https://www.materialui.co/materialIcons/image/add_a_photo_white_72x72.png"
            />
            <input
              className="upload-button"
              onClick={uploadHandler}
              type="file"
              onChange={fileChangedHandler}
              accept="image/x-png,image/gif,image/jpeg"
            ></input>
          </div>
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
