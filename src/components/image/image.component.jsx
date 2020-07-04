import React, { useState, useEffect } from "react";
import "./image.style.css";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";

const { db, auth, stor } = require("../../firebase/index.firebase");

const Image = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  let user = auth.currentUser;
  let username = user.displayName;

  const changeImage = () => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        setImageUrl(doc.data().avatar);
      });
  };

  useEffect(() => {
    changeImage();
  }, []);

  const handleUploadImage = (filename) => {
    setImage(filename);
    stor
      .ref("avatars")
      .child(filename)
      .getDownloadURL()
      .then((url) => db.doc(`/user/${username}`).update({ avatar: url }));
    console.log(imageUrl);

    stor
      .ref("avatars")
      .child(filename)
      .getDownloadURL()
      .then((url) => setImageUrl(url));
  };

  return (
    <div>
      <img
        className="image"
        src={imageUrl || "https://via.placeholder.com/200x300"}
        alt={image}
      />
      <div className="middle">
        <img
          className="upload-photo"
          src="https://www.materialui.co/materialIcons/image/add_a_photo_white_72x72.png"
        />
        <div className="uploader-button">
          <CustomUploadButton
            accept="image/x-png,image/gif,image/jpeg"
            name="image"
            // filename={`${username}`}
            randomizeFilename="true"
            storageRef={stor.ref("avatars")}
            onUploadSuccess={handleUploadImage}
            style={{
              backgroundColor: "steelblue",
              color: "white",
              padding: 10,
              borderRadius: 4,
              fontSize: 25,
            }}
          >
            Tap
          </CustomUploadButton>
        </div>
      </div>
    </div>
  );
};

export default Image;
