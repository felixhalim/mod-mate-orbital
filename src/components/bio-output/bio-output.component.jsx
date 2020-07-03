import React, { useRef, useState } from "react";
import EditBio from "../bio/bio.component";
import "./bio-output.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const BioOutput = () => {
  const inputRef = useRef();
  const [content, setContent] = useState("");

  let user = auth.currentUser;
  let username = user.displayName;

  const [mybio, setMyBio] = useState("");

  db.doc(`/user/${username}`)
    .get()
    .then((doc) => {
      setMyBio(doc.data().bio);
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
        maxLength="140"
        ref={inputRef}
        type="text"
        name="content"
        placeholder="Press enter to save"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </EditBio>
  );
};

export default BioOutput;
