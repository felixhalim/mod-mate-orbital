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
  { status: "Chinese Language" },
  { status: "Chinese Studies" },
  { status: "Japanese Studies" },
  { status: "Malay Studies" },
  { status: "South Asian Studies" },
  { status: "South East Asian Studies" },
  { status: "English Language" },
  { status: "English Literature" },
  { status: "History" },
  { status: "Philosophy" },
  { status: "Theatre Studies" },
  { status: "Communications and New Media" },
  { status: "Economics" },
  { status: "Geography" },
  { status: "Political Science" },
  { status: "Psychology" },
  { status: "Social Work" },
  { status: "Sociology" },
  { status: "Env. Studies in Geography" },
  { status: "Global Studies" },
  { status: "Business Administration" },
  { status: "Business Analytics" },
  { status: "Computer Science" },
  { status: "Information Systems" },
  { status: "Information Security" },
  { status: "Computer Engineering" },
  { status: "Dentistry" },
  { status: "Architecture" },
  { status: "Industrial Design" },
  { status: "Landscape Architecture" },
  { status: "Projet & Facilities Management" },
  { status: "Real Estate" },
  { status: "Biomedical Engineering" },
  { status: "Chemical Engineering" },
  { status: "Civil Engineering" },
  { status: "Engineering Science" },
  { status: "Environmental Engineering" },
  { status: "Electrical Engineering" },
  { status: "Industrial Systems Engineering" },
  { status: "Material Science and Engineering" },
  { status: "Mechanical Engineering" },
  { status: "Undergraduate Law Programme" },
  { status: "Graduate LL.B. Programme" },
  { status: "Medicine" },
  { status: "Nursing" },
  { status: "Music" },
  { status: "Applied Mathematics" },
  { status: "Chemistry" },
  { status: "Computational Biology" },
  { status: "Data Science and Analytics" },
  { status: "Environmental Studies in Biology" },
  { status: "Food Science and Technology" },
  { status: "Life Sciences" },
  { status: "Mathematics" },
  { status: "Pharmacy" },
  { status: "Pharmaceutical Science" },
  { status: "Physics" },
  { status: "Quantitative Finance" },
  { status: "Statistics" },
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
