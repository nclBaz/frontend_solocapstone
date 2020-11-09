import React, { useState, useEffect } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import Styles from "./Styles.module.css";
import { connect } from "react-redux";
import { BiUpload } from "react-icons/bi";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addProfile: (data) =>
    dispatch({
      type: "ADD_PROFILE",
      payload: data,
    }),
});

function ProfileSectiom(props) {
  const [show, setShow] = useState(false);
  const [profil, setProfile] = useState([]);
  const [images, setImages] = useState("");

  useEffect(() => {
    myProfile();
  }, []);

  const myProfile = async () => {
    const result = await fetch("http://localhost:4006/profile/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    setProfile(data);

    props.addProfile(data);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const change = async () => {
    const editData = await fetch("http://localhost:4006/profile/edit", {
      method: "PUT",
      body: JSON.stringify({ ...profil }),
      credential: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const added = await editData.json();
    setProfile(added);
    console.log(added);

    console.log("u kry");
  };

  const handleChange = (e) => {
    let profile = profil;
    profile[e.id] = e.value;
    setProfile({ ...profile });
  };

  const handleUpload = async (e) => {
    const uploadImage = e.target.files[0];
    const image = new FormData();
    image.append("image", uploadImage);
    const uploadPhoto = await fetch(
      "http://localhost:4006/profile/uploadImage",
      {
        method: "POST",
        body: image,
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (uploadPhoto.ok) {
      myProfile();
    } else {
      console.log("uploadd photo is not working");
    }
  };

  return (
    <>
      <div className={`${Styles.profileSection}`}>
        {profil.image && (
          <div className={`${Styles.profileImage}`}>
            {profil.image ? (
              <>
                <img
                  style={{
                    borderRadius: "50%",
                    width: "200px",
                    height: "200px",
                  }}
                  src={profil.image}
                />

                <label
                  className={`${Styles.uploadPhoto}`}
                  for="file-input"
                  aria-required="true"
                  // style={{
                  //   paddingLeft: "30px",
                  //   paddingRight: "30px",
                  // }}
                >
                  <BiUpload />
                </label>
                <input
                  className={`${Styles.input}`}
                  key="image"
                  id="file-input"
                  type="file"
                  accept="image/*"
                  profile="file"
                  // value={this.state.image}
                  onChange={(e) => handleUpload(e)}
                />
              </>
            ) : (
              <>
                <img
                  style={{ borderRadius: "50%" }}
                  src="data:image/jpeg;base64,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"
                />
                <div>
                  <label
                    className={`${Styles.uploadPhoto}`}
                    htmlFor="file-input"
                    aria-required="true"
                  >
                    <BiUpload
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </label>
                  <input
                    className={`${Styles.input}`}
                    key="image"
                    id="file-input"
                    type="file"
                    accept="image/*"
                    profile="file"
                    // value={this.state.image}
                    onChange={(e) => handleUpload(e)}
                  />
                </div>
              </>
            )}
          </div>
        )}
        <div className={`${Styles.basicInfo}`}>
          <div style={{ textAlign: "left" }}>
            <h6>
              Full Name :{profil.name} {profil.surname}{" "}
            </h6>
            <h6>Position : {profil.position}</h6>
            <h6>Location : {profil.location}</h6>
            <h6>
              Birthday : {profil.dateOfBirth && profil.dateOfBirth.slice(0, 10)}
            </h6>
          </div>
        </div>

        <div className={`${Styles.edit}`}>
          <Button variant="primary" onClick={handleShow}>
            Edit Profile
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <div className={`${Styles.modal}`}>
          <h6 style={{ textAlign: "center" }}>Name</h6>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              id="name"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={profil.name || ""}
              onChange={(e) => handleChange(e.currentTarget)}
            />
          </InputGroup>
          <h6 style={{ textAlign: "center" }}>Surname</h6>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              id="surname"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={profil.surname}
              onChange={(e) => handleChange(e.currentTarget)}
            />
          </InputGroup>
          <h6 style={{ textAlign: "center" }}>Location</h6>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              id="location"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={profil.location}
              onChange={(e) => handleChange(e.currentTarget)}
            />
          </InputGroup>
          <h6 style={{ textAlign: "center" }}>Position</h6>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              id="position"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={profil.position}
              onChange={(e) => handleChange(e.currentTarget)}
            />
          </InputGroup>
          <h6 style={{ textAlign: "center" }}>Date of Birth</h6>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              id="dateOfBirth"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={profil.dateOfBirth}
              onChange={(e) => handleChange(e.currentTarget)}
            />
          </InputGroup>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(() => change(), handleClose)}>
            Save Changes
          </Button>
        </Modal.Footer>
        {console.log("modal", profil)}
      </Modal>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSectiom);
