import React from "react";
import "./stranger.styles.css";

const Stranger = () => {
  return (
    <div className="stranger">
      <h2 className="stranger-header">
        Hi there!
        <span> &#x1f44b; </span>
      </h2>
      <p className="stranger-message">Looks like you've gotten yourself lost</p>
      <p className="stranger-rec">
        <a href="/">Click here to go back to main page</a>
      </p>
    </div>
  );
};

export default Stranger;
