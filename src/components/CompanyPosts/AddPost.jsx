import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import { RiImageAddFill } from "react-icons/ri";

export default function AddPost(props) {
  const [jobPosition, setjobPosition] = useState("");
  const [salary, setsalary] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [type, settype] = useState("");
  const [imagePost, setImage] = useState("");
  const [requirments, setRequirments] = useState([]);
  const [benefites, setBenefites] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [show, setShow] = useState(false);
  const url = process.env.REACT_APP_URL;

  const handleClose = () => {
    setShow(false);
    setshowButton(true);
  };
  const handleShow = () => {
    setshowButton(false);

    setShow(true);
  };

  const newPost = {
    jobPosition,
    salary,
    jobDescription,
    requirments,
    benefites,
    type,
  };

  const AddNewPost = async () => {
    const result = await fetch(url + "post/newPost", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(newPost),
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
      const uploadPhoto = await fetch(url + "post/uploadImage/" + data._id, {
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
        handleClose();
        console.log("uploadd photo is not working");
      } else {
        console.log("uploadd photo is not working");
      }
      props.fetchPost();
      handleClose();
    }
  };

  return (
    <>
      <Row>
        <Col
          className="text-center  mt-2 mb-2"
          style={{ alignItems: "center" }}
        >
          {showButton && (
            <Button
              variant="light"
              onClick={() => {
                handleShow();
              }}
            >
              Add New Post
            </Button>
          )}

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="mt-0"
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ textAlign: "center" }}
                >
                  <div>
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
                  </div>
                  <div>
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
                  </div>
                  <div>
                    {" "}
                    <h6> Job Type </h6>
                    {/* <Form.Group controlId="exampleForm.ControlSelect1"> */}
                    <Form.Control
                      as="select"
                      //   value={type}
                      onChange={(e) => {
                        settype(e.target.value);
                      }}
                    >
                      <option>Full Time </option>
                      <option>Part Time</option>
                    </Form.Control>
                    {/* </Form.Group> */}
                  </div>
                  <div>
                    <div>
                      <h6>Add Position Responsibilities </h6>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          placeholder="Add Job Description"
                          rows={5}
                          style={{
                            boxShadow:
                              "2px 2px 2px  rgba(212, 212, 212, 0.938)",
                          }}
                          value={jobDescription}
                          onChange={(e) => {
                            setjobDescription(e.currentTarget.value);
                          }}
                        />
                      </Form.Group>
                    </div>
                    <div>
                      <h6>Add Job Requirments </h6>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Add Job Requirments"
                          style={{
                            boxShadow:
                              "2px 2px 2px  rgba(212, 212, 212, 0.938)",
                          }}
                          value={requirments}
                          onChange={(e) => {
                            setRequirments(e.currentTarget.value);
                          }}
                        />
                      </Form.Group>
                    </div>
                    <div>
                      <h6>Add Job Benefites </h6>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Add Job Benefites"
                          style={{
                            boxShadow:
                              "2px 2px 2px  rgba(212, 212, 212, 0.938)",
                          }}
                          value={benefites}
                          onChange={(e) => {
                            setBenefites(e.currentTarget.value);
                          }}
                        />
                      </Form.Group>
                    </div>
                    <label
                      htmlFor="file-input"
                      aria-required="true"
                      //   className={`${Style.uploadPhoto}`}
                    >
                      <RiImageAddFill
                        style={{ width: "50px", height: "50px" }}
                      />
                    </label>
                    <input
                      style={{ display: "none" }}
                      key="image"
                      id="file-input"
                      type="file"
                      accept="image/*"
                      profile="file"
                      // value={this.state.image}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => AddNewPost()}>
                Post
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </>
  );
}
