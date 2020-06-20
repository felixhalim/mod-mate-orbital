import React, { useRef, useState } from "react";
import EditName from "../name/name.component";
import "./name-output.styles.css";

const firebase = require("firebase");
const { db, auth } = require("../../firebase/index.firebase");

const NameOutput = () => {
  const inputRef = useRef();
  const [content, setContent] = useState("");

  var user = firebase.auth().currentUser;
  var username = user.displayName;

  const [myname, setMyName] = useState("");

  db.collection(`/user/${username}/bio/`)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        setMyName(doc.data().name);
        console.log(myname);
      });
    });

  return (
    <EditName
      text={content}
      placeholder={myname}
      editRef={inputRef}
      type="textarea"
    >
      <textarea
        className="name-input"
        maxLength="18"
        ref={inputRef}
        type="text"
        name="content"
        placeholder="Type here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </EditName>
  );
};

export default NameOutput;
