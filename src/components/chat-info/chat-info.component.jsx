import React, { useState, useEffect, useRef } from "react";
import "./chat-info.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const ChatInfo = () => {
  let user = auth.currentUser;
  let username = user.displayName;

  const [friends, setFriends] = useState("anonymous");

  const [career, setCareer] = useState("");
  const [major, setMajor] = useState("");
  const [residence, setResidence] = useState("");
  const [world, setWorld] = useState("");
  const [teleID, setTeleID] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    db.collection(`/user/${username}/other_info`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          setFriends(doc.data().friends[1]);
        });
      });
  }, []);

  useEffect(() => {
    db.doc(`/user/${friends}`)
      .get()
      .then((doc) => setCareer(doc.data().career));
  }, [career]);

  useEffect(() => {
    db.doc(`/user/${friends}`)
      .get()
      .then((doc) => setMajor(doc.data().major));
  }, [major]);

  useEffect(() => {
    db.doc(`/user/${friends}`)
      .get()
      .then((doc) => setResidence(doc.data().residence));
  }, [residence]);

  useEffect(() => {
    db.doc(`/user/${friends}`)
      .get()
      .then((doc) => setWorld(doc.data().nationality));
  }, [world]);

  useEffect(() => {
    db.collection(`/user/${friends}/private_info/`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          setTeleID(doc.data().telegram_id);
        });
      });
  }, [friends, teleID]);

  useEffect(() => {
    db.collection(`/user/${friends}/private_info/`)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          setMail(doc.data().email);
        });
      });
  }, [friends, mail]);

  return (
    <div>
      <div className="top-large-box">
        <div className="career--icon">
          <img
            id="career--size"
            src="https://www.materialui.co/materialIcons/action/timeline_white_144x144.png"
            alt="career--icon"
          />
          <p className="career">{career}</p>
        </div>
        <div className="left-line"></div>
        <div className="major--icon">
          <img
            id="major--size"
            src="https://www.materialui.co/materialIcons/action/book_white_144x144.png"
            alt="major--icon"
          />
          <p className="major">{major}</p>
        </div>
        <div className="right-line"></div>
        <div className="residence--icon">
          <img
            id="residence--size"
            src="https://www.materialui.co/materialIcons/action/home_white_144x144.png"
            alt="residence--icon"
          />
          <p className="residence">{residence}</p>
        </div>
        <div className="separator-line"></div>
        <div className="world--icon">
          <img
            id="world--size"
            src="https://www.materialui.co/materialIcons/action/language_white_144x144.png"
            alt="world--icon"
          />
          <p className="world">{world}</p>
        </div>
        <div className="telegram--icon">
          <img
            id="telegram--size"
            src="https://i.pinimg.com/originals/99/f0/3f/99f03fdee90d871d3d1e718c82feb8be.png"
            alt="telegram--icon"
          />
          <p className="telegram">{teleID}</p>
        </div>
        <div className="mail--icon">
          <img
            id="mail--size"
            src="https://www.materialui.co/materialIcons/communication/mail_outline_white_144x144.png"
            alt="mail--icon"
          />
          <p className="mail">{mail}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
