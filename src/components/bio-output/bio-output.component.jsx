import React, { useRef, useState } from "react";
import EditBio from "../bio/bio.component";
import "./bio-output.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const BioOutput = () => {
  const inputRef = useRef();
  const [content, setContent] = useState("");

  var user = auth.currentUser;
  var username = user.displayName;

  const [mybio, setMyBio] = useState("");

  db.collection(`/user/${username}/bio/`)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        setMyBio(doc.data().bio);
      });
    });

  return (
    <EditBio
      text={content}
      placeholder={mybio}
      editRef={inputRef}
      type="textarea"
    >
      <textarea
        className="bio-input"
        maxLength="200"
        ref={inputRef}
        type="text"
        name="content"
        placeholder="Type here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </EditBio>
  );
};

export default BioOutput;
