import React, { useState } from "react";
import "./submit.styles.css";

const Submit = ({ addModules }) => {
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addModules(title);
    setTitle("");
  };

  return (
    <form className="submit" onSubmit={handleSubmit}>
      <input
        className="submit-txt"
        type="text"
        name=""
        value={title}
        placeholder="Paste your NUSMODS Link here"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="submit-btn"
        type="image"
        src="https://www.materialui.co/materialIcons/file/cloud_upload_white_192x192.png"
        alt="submit"
      ></input>
    </form>
  );
};

export default Submit;
