import React, { useState, useEffect } from "react";
import "./user-info-edit.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const EditTelegram = ({
  text,
  placeholder,
  editRef,
  type,
  children,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (editRef && editRef.current && isEditing === true) {
      editRef.current.focus();
    }
  }, [isEditing, editRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const enterkey = ["Enter"];
    const keys = ["Escape", "Tab"];
    if (type === "textarea" && keys.indexOf(key) > -1) {
      setEditing(false);
    }
    if (type === "textarea" && enterkey.indexOf(key) > -1) {
      let user = auth.currentUser;
      let activeTeleID = children.props.value;
      let username = user.displayName;

      db.collection(`/user/${username}/private_info/`)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            let telegramid = doc.id;
            db.doc(`/user/${username}/private_info/${telegramid}`).update({
              telegram_id: activeTeleID,
            });
          });
        });
      setEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onKeyDown={(e) => handleKeyDown(e, type)}
          onBlur={() => setEditing(false)}
        >
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text || placeholder || "Your Telegram ID here"}</span>
        </div>
      )}
    </section>
  );
};

export default EditTelegram;
