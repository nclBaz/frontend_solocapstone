import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Styles from "./Styles.module.css";

export default function Profile(props) {
  console.log(props.fullProfile, "ca ka profili");

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
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
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
