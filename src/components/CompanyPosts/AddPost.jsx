import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

export default function AddPost(props) {
  const [jobPosition, setjobPosition] = useState("");
  const [salary, setsalary] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [image, setImage] = useState("");
  const [requirments, setRequirments] = useState([]);
  const [benefites, setBenefites] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [showButton, setshowButton] = useState(true);
  const [hideButton, sethideButton] = useState(false);

  const newPost = {
    jobPosition,
    salary,
    jobDescription,
    requirments,
    benefites,
  };

  const AddNewPost = async () => {
    const result = await fetch("http://localhost:4006/post/newPost/", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const Data = await result.json();
      props.fetchPost();
      //   e.target.files[0];
      const uploadImage = image;
      const image = new FormData();
      image.append("image", uploadImage);
      const uploadPhoto = await fetch(
        "http://localhost:4006/login/uploadImage" + Data._id,
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
        // fetchProfile();
        console.log("uploadd photo is not working");
      } else {
        console.log("uploadd photo is not working");
      }
    }
  };

  const openInput = () => {
    setOpenForm(true);
    setCloseForm(false);
    setshowButton(false);
    sethideButton(true);
  };

  return (
    <>
      <Row>
        <Col className="text-center  mt-5" style={{ alignItems: "center" }}>
          {showButton && (
            <Button variant="light" onClick={() => openInput()}>
              Add New Post
            </Button>
          )}
          {openForm && (
            <>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <div style={{ alignItems: "center" }}>
                      <h6>Add Job Job Position</h6>
                      <Form.Control
                        size="sm"
                        style={{
                          width: "100%",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        type="text"
                        placeholder="Small text"
                      />
                    </div>
                    <div>
                      <h6>Add Job Salary </h6>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Small text"
                        style={{
                          width: "100%",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h6>Add Job Description </h6>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control
                        as="textarea"
                        style={{
                          width: "30%",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <h6>Add Job Requirments </h6>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control
                        as="textarea"
                        style={{
                          width: "40%",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <h6>Add Job Benefites </h6>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control
                        as="textarea"
                        style={{
                          width: "30%",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
