import React, { useState, useEffect } from "react";
import "./user-info.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const UserInfo = () => {
  const [world, setWorld] = useState("");
  const [teleID, setTeleID] = useState("");
  const [mail, setMail] = useState("");

  let user = auth.currentUser;
  let username = user.displayName;
  console.log(world);
  console.log(teleID);
  console.log(mail);

  useEffect(() => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => setWorld(doc.data().nationality));
  }, [world]);

  useEffect(() => {
    db.collection(`/user/${username}/private_info/`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          setTeleID(doc.data().telegram_id);
        });
      });
  }, [teleID]);

  useEffect(() => {
    db.collection(`/user/${username}/private_info/`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          setMail(doc.data().email);
        });
      });
  }, [mail]);

  return (
    <div>
      <div className="big-box">
        <div className="world-icon">
          <img
            id="world-size"
            src="https://www.materialui.co/materialIcons/action/language_white_144x144.png"
            alt="world-icon"
          />
          <p className="world">{world}</p>
        </div>
        <div className="line-left"></div>
        <div className="telegram-icon">
          <img
            id="telegram-size"
            src="https://i.pinimg.com/originals/99/f0/3f/99f03fdee90d871d3d1e718c82feb8be.png"
            alt="world-icon"
          />
          <p className="telegram">{teleID}</p>
        </div>
        <div className="line-right"></div>
        <div className="mail-icon">
          <img
            id="mail-size"
            src="https://www.materialui.co/materialIcons/communication/mail_outline_white_144x144.png"
            alt="mail-icon"
          />
          <p className="mail">{mail}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
