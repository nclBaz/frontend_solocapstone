import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import Styles from "./Styles.module.css";
import { TiDelete } from "react-icons/ti";
import { BiUpload } from "react-icons/bi";
export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [postSkill, setPostSkill] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getSkills();
  }, []);
  const getSkills = async () => {
    const skills = await fetch("http://localhost:4006/skills/skill", {
      method: "GET",
      credentilas: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (skills.ok) {
      const data = await skills.json();
      setSkills(data);
    }
  };

  const postskill = async () => {
    const post = await fetch("http://localhost:4006/skills/postSkill", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ skillName: postSkill }),
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
    });
    if (post.ok) {
      const data = await post.json();
      setSkills([...skills, data]);
      setPostSkill("");
      handleClose();
    }
  };

  const deleteSkill = async (id) => {
    const post = await fetch("http://localhost:4006/skills/delete/" + id, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        // "Content-Type": "application/json",
      },
    });
    if (post.ok) {
      getSkills();

      handleClose();
    }
  };

  return (
    <>
      <Row>
        <Col xs={8} sm={7} md={7} lg={7}>
          <h4 className="ml-auto">Skills</h4>
        </Col>
        <Col xs={3} sm={4} md={4} lg={4} className="text-right mr-4 ">
          <BiUpload
            style={{ fontSize: "25px", paddingTop: "5px" }}
            onClick={handleShow}
          />
        </Col>
      </Row>
      <Row className={`${Styles.skills}`}>
        {skills &&
          skills.map((skill) => {
            return (
              <Col xs={4} sm={4} md={4} lg={2}>
                <p style={{ marginLeft: "10px" }}>
                  {skill.skillName}
                  <TiDelete onClick={() => deleteSkill(skill._id)} />
                </p>
              </Col>
            );
          })}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Skills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ textAlign: "center" }}>Add Skill</h6>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              id="surname"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={postSkill}
              onChange={(e) => setPostSkill(e.currentTarget.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => postskill()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
