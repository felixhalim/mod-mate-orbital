import React from "react";

import "./profile-right.styles.css";

import Career from "../particulars/career.component";
import Major from "../particulars/major.component";
import Residence from "../particulars/residence.component";

const ProfileRight = () => {
  return (
    <div>
      <div className="align">
        <Career></Career>
        <Major></Major>
        <Residence></Residence>
      </div>
    </div>
  );
};

export default ProfileRight;
