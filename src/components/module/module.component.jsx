import React from "react";

import "./module.styles.css";

export const Card = (props) => (
  <div className="module-container">
    <h4 className="content">{props.module}</h4>
  </div>
);
