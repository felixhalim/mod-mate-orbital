import React from "react";
import "./profile-right.styles.css";

const ProfileRight = () => {
  return (
    <div>
      <div className="align">
        <div className="container" id="Career">
          <div className="card">
            <div className="image-box" data-text="Career">
              <img src="https://www.materialui.co/materialIcons/action/timeline_white_108x108.png" />
            </div>
            <div className="content">
              <div>
                <h3>Career</h3>
                <p>Freshman</p>
                <a href="#">Update</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="Major">
          <div className="card">
            <div className="image-box" data-text="Major">
              <img src="https://www.materialui.co/materialIcons/action/book_white_108x108.png" />
            </div>
            <div className="content">
              <div>
                <h3>Major</h3>
                <p>Electrical Engineering</p>
                <a href="#">Update</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="Residence">
          <div className="card">
            <div className="image-box" data-text="Residence">
              <img src="https://www.materialui.co/materialIcons/action/home_white_108x108.png" />
            </div>
            <div className="content">
              <div>
                <h3>Residence</h3>
                <p>Temasek Hall</p>
                <a href="#">Update</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="align">
        <div className="container" id="Nationality">
          <div className="card">
            <div className="image-box" data-text="Nationality">
              <img src="https://www.materialui.co/materialIcons/action/language_white_108x108.png" />
            </div>
            <div className="content">
              <div>
                <h3>Nationality</h3>
                <p>Indonesian</p>
                <a href="#">Update</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="Telegram_ID">
          <div className="card">
            <div className="image-box" data-text="Telegram_ID">
              <img
                className="inverted"
                src="https://i.pinimg.com/originals/99/f0/3f/99f03fdee90d871d3d1e718c82feb8be.png"
              />
            </div>
            <div className="content">
              <div>
                <h3>Telegram_ID</h3>
                <p>cristiano_sr.</p>
                <a href="#">Update</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="Email">
          <div className="card">
            <div className="image-box" data-text="Email">
              <img src="https://www.materialui.co/materialIcons/communication/mail_outline_white_108x108.png" />
            </div>
            <div className="content">
              <div>
                <h3>Email</h3>
                <p>cristiano@u.nus.edu</p>
                <a href="#">Update</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRight;
