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

const majors = [
  { status: "Mathematics" },
  { status: "Statistics" },
  { status: "Applied Mathematics" },
  { status: "Data Science and Analytics" },
];

const Major = () => {
  const classes = useStyles();
  const [modalMajor, setModalMajor] = useState(false);
  const [major, setMajor] = useState("");

  let user = auth.currentUser;
  let username = user.displayName;

  useEffect(() => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        setMajor(doc.data().major);
      });
  }, [modalMajor]);

  const updateMajor = () => {
    db.doc(`/user/${username}`).update({
      major: major,
    });
    setModalMajor(false);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="image-box" data-text="Major">
          <img src="https://www.materialui.co/materialIcons/action/book_white_108x108.png" />
        </div>
        <div className="content">
          <div>
            <h3>Major</h3>
            <p>{major}</p>
            <a onClick={() => setModalMajor(true)}>Update</a>
            <Modal
              closeTimeoutMS={500}
              isOpen={modalMajor}
              onRequestClose={() => setModalMajor(false)}
              className="modal"
              overlayClassName="modal-overlay"
            >
              <h2>Major</h2>
              <p>Update your major below!</p>
              <div className="modal-box">
                <Autocomplete
                  style={{ width: 300 }}
                  options={majors}
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
                      label="Choose your major"
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    >
                      {setMajor(params.inputProps.value)}
                    </TextField>
                  )}
                />
              </div>
              <div>
                <a className="submit-button" onClick={updateMajor}>
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

export default Major;
