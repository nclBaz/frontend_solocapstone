import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import Styles from "./Styles.module.css";
export default function SendEmail(props) {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);

  const sendEmail = async () => {
    const result = await fetch(
      "http://localhost:4006/aplicationn/sendEmail/" + props._id,
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
      props.handleClose();
    } else {
      setAlert(true);
    }
  };

  return (
    <div>
      <>
        <Modal
          show={props.show}
          onHide={props.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Recipient Email</h6>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient Email"
                aria-label="Recipient Email"
                aria-describedby="basic-addon2"
                value={props.email}
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
            {alert && (
              <Alert variant="danger">Please Check Your Inputs Better</Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button className={`${Styles.btngrad}`} onClick={props.handleClose}>
              Close
            </Button>
            <Button className={`${Styles.btngrad}`} onClick={() => sendEmail()}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
