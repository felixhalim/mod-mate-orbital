import React from "react";
import "./user-card.styles.css";
const UserCard = (props) => {
  return (
    <div className="user-container">
      <img
        className="user-image"
        alt="user"
        src="https://www.abc.net.au/cm/rimage/9913894-3x2-xlarge.jpg?v=5"
      />
      <h4 className="user-content">{props.name}</h4>
      <img
        className="career-icon"
        alt="career-icon"
        src="https://www.materialui.co/materialIcons/action/timeline_white_108x108.png"
      />
      <img
        className="major-icon"
        alt="major-icon"
        src="https://www.materialui.co/materialIcons/action/book_white_108x108.png"
      />
      <img
        className="residence-icon"
        alt="residence-icon"
        src="https://www.materialui.co/materialIcons/action/home_white_108x108.png"
      />
      <img
        className="nation-icon"
        alt="nation-icon"
        src="https://www.materialui.co/materialIcons/action/language_white_108x108.png"
      />
      <div className="chat-section">
        <img
          className="chat-icon"
          alt="chat-icon"
          src="https://cdn.onlinewebfonts.com/svg/img_381628.png"
        />
      </div>
    </div>
  );
};

export default UserCard;
