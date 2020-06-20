import React from "react";
import "./stranger.styles.css";

const Stranger = () => {
  return (
    <div className="stranger">
      <h2 className="stranger-header">Hi there!</h2>
      <p className="stranger-message">Looks like you've gotten yourself lost</p>
      <p className="stranger-rec">
        Let us help you with our pop-up recommendation above &#9757;
      </p>
    </div>
  );
};

export default Stranger;
