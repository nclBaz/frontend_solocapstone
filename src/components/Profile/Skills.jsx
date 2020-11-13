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
  const url = process.env.REACT_APP_URL;
  const [skills, setSkills] = useState([]);
  const [postSkill, setPostSkill] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getSkills();
  }, []);
  const getSkills = async () => {
    const skills = await fetch(url + "skills/skill", {
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
    const post = await fetch(url + "skills/postSkill", {
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
    const post = await fetch(url + "skills/delete/" + id, {
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
        <Col xs={12} sm={12} md={12} lg={12} className="text-center ">
          <Button
            style={{
              fontSize: "15px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
            variant="light"
            className={`${Styles.btngrad}`}
            onClick={handleShow}
          >
            Add Skills
          </Button>
        </Col>

        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={`${Styles.carts} mt-1`}
          style={{ display: "flex" }}
        >
          {skills &&
            skills.map((skill) => {
              return (
                <Button variant="light" style={{ marginLeft: "10px" }}>
                  {skill.skillName}
                  <TiDelete onClick={() => deleteSkill(skill._id)} />
                </Button>
              );
            })}{" "}
        </Col>
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
