import React from "react";
import "./stranger.styles.css";

const Stranger = () => {
  return (
    <div className="stranger">
      <div class="words">
        <div class="word">M</div>
        <div class="word">o</div>
        <div class="word">d</div>
        <div class="word">M</div>
        <div class="word">a</div>
        <div class="word">t</div>
        <div class="word">e</div>
      </div>
      <div className="error">
        <h2 className="stranger-header">
          Hi there!
          <span> &#x1f44b; </span>
        </h2>
        <p className="stranger-message">
          If you get stuck in this page, there might have been an issue while
          loading your data
        </p>
        <p className="stranger-rec">
          <a className="recommendation" href="/">
            Click here to go back to sign-in page
          </a>
        </p>
      </div>
    </div>
  );
};

export default Stranger;
