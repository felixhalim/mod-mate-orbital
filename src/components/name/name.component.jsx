import React, { useState, useEffect } from "react";
import "./name.styles.css";

const { db, auth } = require("../../firebase/index.firebase");

const EditName = ({ text, placeholder, editRef, type, children, ...props }) => {
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
    // const allkeys = [...keys, enterkey];
    if (type === "textarea" && keys.indexOf(key) > -1) {
      setEditing(false);
    }
    if (type === "textarea" && enterkey.indexOf(key) > -1) {
      let user = auth.currentUser;
      let activename = children.props.value;
      let username = user.displayName;

      db.doc(`/user/${username}`).update({
        name: activename,
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
          <span>{text || placeholder || "Your Name here"}</span>
        </div>
      )}
    </section>
  );
};

export default EditName;
