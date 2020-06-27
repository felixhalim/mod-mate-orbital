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

const careers = [
  { status: "Exchange Student" },
  { status: "Undergraduate Year 1" },
  { status: "Undergraduate Year 2" },
  { status: "Undergraduate Year 3" },
  { status: "Undergraduate Year 4" },
  { status: "Undergraduate Year 5" },
  { status: "Graduate Year 1" },
  { status: "Graduate Year 2" },
  { status: "Graduate Year 3" },
  { status: "Graduate Year 4" },
];

const Career = () => {
  const classes = useStyles();
  const [modalCareer, setModalCareer] = useState(false);
  const [career, setCareer] = useState("");

  let user = auth.currentUser;
  let username = user.displayName;

  useEffect(() => {
    db.doc(`/user/${username}`)
      .get()
      .then((doc) => {
        setCareer(doc.data().career);
      });
  }, [modalCareer]);

  const updateCareer = () => {
    db.doc(`/user/${username}`).update({
      career: career,
    });
    setModalCareer(false);
  };

  return (
    <div className="container" id="Career">
      <div className="card">
        <div className="image-box" data-text="Career">
          <img src="https://www.materialui.co/materialIcons/action/timeline_white_108x108.png" />
        </div>
        <div className="content">
          <div>
            <h3>Career</h3>
            <p>{career}</p>
            <a id="career" onClick={() => setModalCareer(true)}>
              Update
            </a>
            <Modal
              closeTimeoutMS={500}
              isOpen={modalCareer}
              onRequestClose={() => setModalCareer(false)}
              className="modal"
              overlayClassName="modal-overlay"
            >
              <h2>Career</h2>
              <p>Update your career below!</p>
              <div className="modal-box">
                <Autocomplete
                  id="career-select"
                  style={{ width: 300 }}
                  options={careers}
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
                      label="Choose your career"
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    >
                      {setCareer(params.inputProps.value)}
                    </TextField>
                  )}
                />
              </div>

              <div>
                <a className="submit-button" onClick={updateCareer}>
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

export default Career;
