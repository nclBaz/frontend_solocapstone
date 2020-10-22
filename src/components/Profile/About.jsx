import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { connect } from "react-redux";
import Styles from "./Styles.module.css";
import { Modal, Button } from "react-bootstrap";
const mapStateToProps = (state) => state;
function About(props) {
  const [about, setabout] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = async () => {
    if (props.profile.profileData && props.profile.profileData.aboutMe) {
      setabout(props.profile.profileData.aboutMe);
    }
  };
  const change = async () => {
    const editData = await fetch("http://localhost:4006/profile/edit", {
      method: "PUT",
      body: JSON.stringify({ aboutMe: about }),
      credential: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const added = await editData.json();
    setabout(added.aboutMe);

    window.location.reload();
  };

  useEffect(() => {
    const hello = () => {
      console.log("he;lllllo");
    };
    hello();
  }, [about]);

  console.log(about, "what is doing");
  return (
    <>
      <div className="m-0 p-0">
        <Row className="mt-5 ">
          <Col xs={7}>
            <h4 className="ml-auto">About Me</h4>
          </Col>
          <Col xs={4} className="text-right mr-4 ">
            <FiEdit
              style={{ fontSize: "25px", paddingTop: "5px" }}
              onClick={() => {
                data();
                handleShow();
              }}
            />
          </Col>
        </Row>
        {props.profile.profileData && (
          <>
            <div className={`${Styles.about} mb-3 mt-2`}>
              <div>
                {props.profile.profileData.aboutMe ? (
                  <h6 style={{ width: "93%" }}>
                    {props.profile.profileData.aboutMe}
                  </h6>
                ) : (
                  <p>About is empty </p>
                )}
              </div>
            </div>
          </>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit About</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <FormControl
                id="aboutMe"
                as="textarea"
                aria-label="With textarea"
                value={about}
                onChange={(e) => setabout(e.currentTarget.value)}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                change();
                handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
export default connect(mapStateToProps)(About);
