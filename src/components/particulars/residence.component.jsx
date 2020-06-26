import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./cards.styles.css";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const { db, auth } = require("../../firebase/index.firebase");

Modal.setAppElement("#root");

const useStyles = makeStyles({
  option: {
    fontSize: 15,
  },
});

const residences = [
  { status: "Temasek Hall" },
  { status: "Eusoff Hall" },
  { status: "Raffles Hall" },
  { status: "Sheares Hall" },
];

const Residence = () => {
  const classes = useStyles();
  const [modalResidence, setModalResidence] = useState(false);
  const [residence, setResidence] = useState("");

  let user = auth.currentUser;
  let username = user.displayName;

  useEffect(() => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        setResidence(doc.data().residence);
      });
  }, [modalResidence]);

  const updateResidence = () => {
    db.doc(`/user/${username}`).update({
      residence: residence,
    });
    setModalResidence(false);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="image-box" data-text="Residence">
          <img src="https://www.materialui.co/materialIcons/action/home_white_108x108.png" />
        </div>
        <div className="content">
          <div>
            <h3>Residence</h3>
            <p>{residence}</p>
            <a onClick={() => setModalResidence(true)}>Update</a>
            <Modal
              closeTimeoutMS={500}
              isOpen={modalResidence}
              onRequestClose={() => setModalResidence(false)}
              className="modal"
              overlayClassName="modal-overlay"
            >
              <h2>Residence</h2>
              <p>Update your residence below!</p>
              <div className="modal-box">
                <Autocomplete
                  style={{ width: 300 }}
                  options={residences}
                  classes={{
                    option: classes.option,
                  }}
                  autoHighlight
                  getOptionLabel={(option) => option.status}
                  renderOption={(option) => (
                    <React.Fragment>{option.status}</React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose your residence"
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    >
                      {setResidence(params.inputProps.value)}
                    </TextField>
                  )}
                />
              </div>
              <div>
                <a className="submit-button" onClick={updateResidence}>
                  Submit
                </a>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Residence;
