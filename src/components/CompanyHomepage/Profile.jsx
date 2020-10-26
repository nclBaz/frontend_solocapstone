import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Profile(props) {
  console.log(props.fullProfile, "hello from the other side");
  const [singelUser, setsingelUser] = useState([]);

  useEffect(() => {
    singleUser();
  }, []);
  const singleUser = async () => {
    const result = await fetch(
      "http://localhost:4006/login/singleProfile/" + props.fullProfile._id,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await result.json();
    setsingelUser(data);
    console.log("u kry");
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
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
