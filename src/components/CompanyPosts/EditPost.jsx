import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { RiImageAddFill } from "react-icons/ri";
export default function EditPost(props) {
  const [jobPosition, setjobPosition] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [salary, setsalary] = useState("");
  const [requirments, setRequirments] = useState("");
  const [benefites, setBenefites] = useState("");
  const [type, settype] = useState("");
  const [imagePost, setImage] = useState("");
  const url = process.env.REACT_APP_URL;

  const getSingelPost = async () => {
    const data = await fetch(url + "post/singelPost/" + props.data, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const post = await data.json();

    setjobPosition(post.jobPosition);
    setjobDescription(post.jobDescription);
    setsalary(post.salary);
    setRequirments(post.requirments);
    setBenefites(post.benefites);
    settype(post.type);
  };
  useEffect(() => {
    getSingelPost();
  }, [props.data]);
  console.log(props.data);

  const edited = {
    jobDescription,
    jobPosition,
    salary,
    requirments,
    benefites,
    type,
  };
  const AddNewPost = async () => {
    const result = await fetch(url + "post/editPost/" + props.data, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(edited),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (data) {
      console.log(data);

      const uploadImage = imagePost;
      const image = new FormData();
      image.append("image", uploadImage);
      const uploadPhoto = await fetch(url + "post/uploadImage/" + props.data, {
        method: "POST",
        body: image,
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });

      if (uploadPhoto.ok) {
        console.log("uploaded");
        props.fetchPost();
        props.handleClose();
        console.log("uploadd photo is not working");
      } else {
        console.log("uploadd photo is not working");
      }
      props.fetchPost();
      props.handleClose();
    } else {
      props.fetchPost();
      props.handleClose();
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ textAlign: "center" }}>
          <Form.Group>
            <h6>Add Job Position</h6>
            <Form.Control
              size="sm"
              className="mb-2"
              type="text"
              placeholder="Add Job  Position"
              style={{
                boxShadow: "2px 2px 2px  rgba(212, 212, 212, 0.938)",
              }}
              value={jobPosition}
              onChange={(e) => {
                setjobPosition(e.currentTarget.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <h6>Add Job Salary </h6>
            <Form.Control
              className="mb-2"
              size="sm"
              type="text"
              placeholder="Add Job Salary"
              style={{
                boxShadow: "2px 2px 2px  rgba(212, 212, 212, 0.938)",
              }}
              value={salary}
              onChange={(e) => {
                setsalary(e.currentTarget.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <h6> Job Type </h6>
            <Form.Control
              as="select"
              onChange={(e) => {
                settype(e.target.value);
              }}
            >
              <option>Full Time </option>
              <option>Part Time</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <h6>Add Position Responsibilities </h6>

            <Form.Control
              as="textarea"
              placeholder="Add Job Description"
              rows={5}
              style={{
                boxShadow: "2px 2px 2px  rgba(212, 212, 212, 0.938)",
              }}
              value={jobDescription}
              onChange={(e) => {
                setjobDescription(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <h6>Add Job Requirments </h6>

            <Form.Control
              as="textarea"
              placeholder="Add Job Requirments"
              rows={5}
              style={{
                boxShadow: "2px 2px 2px  rgba(212, 212, 212, 0.938)",
              }}
              value={requirments}
              onChange={(e) => {
                setRequirments(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <h6>Add Job Benefites </h6>

            <Form.Control
              as="textarea"
              placeholder="Add Job Benefites"
              rows={5}
              style={{
                boxShadow: "2px 2px 2px  rgba(212, 212, 212, 0.938)",
              }}
              value={benefites}
              onChange={(e) => {
                setBenefites(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <label htmlFor="file-input" aria-required="true">
            <RiImageAddFill style={{ width: "50px", height: "50px" }} />
          </label>
          <input
            style={{ display: "none" }}
            key="image"
            id="file-input"
            type="file"
            accept="image/*"
            profile="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => AddNewPost()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
