import React, { useRef, useState } from "react";
import EditName from "../name/name.component";
import "./name-output.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const NameOutput = () => {
  const inputRef = useRef();
  const [content, setContent] = useState("");

  let user = auth.currentUser;
  let username = user.displayName;

  const [myname, setMyName] = useState("");

  db.doc(`/user/${username}`)
    .get()
    .then((doc) => {
      setMyName(doc.data().name);
    });

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <EditName
      text={content}
      placeholder={myname}
      editRef={inputRef}
      type="textarea"
    >
      <textarea
        className="name-input"
        maxLength="17"
        ref={inputRef}
        type="text"
        name="content"
        placeholder="Press enter to save"
        value={content}
        onChange={(e) => setContent(toTitleCase(e.target.value))}
      />
    </EditName>
  );
};

export default NameOutput;
