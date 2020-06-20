import React, { useRef, useState } from "react";
import EditBio from "../bio/bio.component";
import "./bio-output.styles.css";

const BioOutput = () => {
  const inputRef = useRef();
  const [content, setContent] = useState("");

  return (
    <EditBio
      text={content}
      placeholder="Fill your bio here (press enter to save)"
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
