import React, { useState, useEffect } from "react";
import "./module-list.styles.css";
import { Card } from "../module/module.component";
import Submit from "../submit/submit.component";

const { db, auth } = require("../../firebase/index.firebase");
const axios = require("axios");

const ModuleList = () => {
  const [modalModules, setModalModules] = useState(false);
  const [nusmodules, setNusmodules] = useState([]);
  let user = auth.currentUser;
  let username = user.displayName;

  useEffect(() => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => setNusmodules(doc.data().mods_taken));
  }, [modalModules]);

  const addModules = async (nusmodules) => {
    let modules = nusmodules.split("&");
    let modulesTaken = [];
    let mod;
    for (mod of modules) {
      if (mod.includes("?")) {
        mod = mod.split("?");
        mod = mod[1];
      }
      mod = mod.split("=", 1);
      await axios
        .get(`https://api.nusmods.com/v2/2020-2021/modules/${mod}.json`) // eslint-disable-next-line
        .then(function (response) {
          if (response.status === 200) {
            modulesTaken.push(mod[0]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    let moduleFields = {
      mods_taken: modulesTaken,
    };

    db.doc(`/user/${username}`).update(moduleFields);

    setNusmodules(modulesTaken);
  };

  return (
    <div>
      <Submit addModules={addModules} />
      <div className="box">
        <ul className="module-list">
          {nusmodules.map((module) => (
            <Card key={module.id} module={module} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModuleList;
