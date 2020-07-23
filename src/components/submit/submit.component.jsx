import React, { useState } from "react";
import "./submit.styles.css";

const Submit = ({ addModules }) => {
  const [url, setUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addModules(url);
    setUrl("");
  };

  return (
    <form className="submit" onSubmit={handleSubmit}>
      <input
        className="submit-txt"
        type="text"
        name=""
        value={url.toUpperCase()}
        placeholder="Paste your NUSMODS Link here or input manually with an ampersand separated value (CS1010&LAK1201&ST2334...)"
        onChange={(e) => setUrl(e.target.value)}
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
