import React, { useState } from "react";
import { Modal, Button, InputGroup, FormControl, Alert } from "react-bootstrap";
import Styles from "./Styles.module.css";
export default function Accept(props) {
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const url = process.env.REACT_APP_URL;
  const showFields = () => {
    setShow(!show);
  };
  const sendEmail = async () => {
    const result = await fetch(
      url + "aplicationn/sendEmail/" + props.data._id,
      {
        method: "POST",
        body: JSON.stringify({ subject, text }),
        creadentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    if (result.ok) {
      console.log("mesage is sent");
      setText("");
      setSubject("");
    } else {
      setAlert(true);
    }
  };

  const acceptAplication = async () => {
    const result = await fetch(
      url + "aplicationn/" + props.id + "/accept/" + props.data._id,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result.ok) {
      console.log("aplikimi u pranua");
      props.posts();
      props.handleClose();
      props.emptyPorfile();
      setText("");
      setSubject("");
      props.allPosts();
    } else {
      setAlert2(true);
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        style={{ top: "40px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Accept Worker</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5>
            You are accepting this aplicant .Do you want to send an email?
          </h5>
          <Button
            style={{ border: 0 }}
            className={`  ${Styles.btngrad}`}
            onClick={showFields}
          >
            Open Form
          </Button>
          {show && (
            <>
              <h6 className="mt-2">Recipient Email</h6>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Recipient Email"
                  aria-label="Recipient Email"
                  aria-describedby="basic-addon2"
                  value={props.data.email}
                />
              </InputGroup>
              <h6>Subject</h6>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Subject"
                  aria-label="Subject"
                  aria-describedby="basic-addon2"
                  value={subject}
                  onChange={(e) => setSubject(e.currentTarget.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Text</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  as="textarea"
                  aria-label="Text"
                  value={text}
                  onChange={(e) => setText(e.currentTarget.value)}
                />
              </InputGroup>
              <Button
                style={{ border: 0 }}
                className={` mt-2 ${Styles.btngrad}`}
                onClick={() => {
                  sendEmail();
                }}
              >
                Send Email
              </Button>

              {alert && (
                <Alert variant="danger">Please Check Your Inputs Better</Alert>
              )}
            </>
          )}
          {alert2 && (
            <Alert variant="danger">This user cannot be accepted</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ border: 0 }}
            className={`  ${Styles.btngrad}`}
            onClick={() => {
              acceptAplication();
            }}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
