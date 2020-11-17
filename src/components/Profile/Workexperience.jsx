import React, { Component } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";

import Styles from "./Styles.module.css";
const url = process.env.REACT_APP_URL;
export default class Workexperience extends Component {
  state = {
    experiences: [],
    postExperience: {
      workExperience: "",
      description: "",
      started: "",
      finished: "",
      workPosition: "",
    },
    image: "",
    postId: "",
    editShow: false,
    show: false,
    postData: [],
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => {
    this.setState({ show: true });
    this.setState({
      postExperience: {
        ...this.state.postExperience,

        workExperience: "",
        description: "",
        started: "",
        finished: "",
        workPosition: "",
      },
    });
  };

  editClose = () => this.setState({ editShow: false });
  editShow = (data) => {
    this.setState({ editShow: true });
    this.setState({
      postExperience: {
        ...this.state.postExperience,
        workExperience: data.workExperience,
        description: data.description,
        started: data.started,
        finished: data.finished,
        workPosition: data.workPosition,
      },
    });
    this.setState({ postId: data._id });
  };

  componentDidMount = async () => {
    this.fetchData();
  };
  fetchData = async () => {
    const getExperience = await fetch(url + `/workExperience/workExperience`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await getExperience.json();
    this.setState({ experiences: data });
    console.log(data, "where are the data");
  };

  postExperience = async () => {
    const getExperience = await fetch(url + `/workExperience/postWork`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ ...this.state.postExperience }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const id = await getExperience.json();
    console.log(id, "what have inside");
    if (id) {
      const image = new FormData();
      image.append("image", this.state.image);
      const uploadPhoto = await fetch(
        url + `/workExperience/uploadImage/` + id._id,
        {
          method: "POST",
          credentials: "include",
          body: image,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await uploadPhoto.json();
      if (data) {
        console.log("imazhi u shtua");

        console.log(data, "hhsbjbsdjjhsbdjbsdv");
      }
      //   this.fetchData();
      this.setState({
        postExperience: {
          ...this.state.postExperience,

          workExperience: "",
          description: "",
          started: "",
          finished: "",
          workPosition: "",
        },
      });
      this.setState({ image: "" });
      //   this.fetchData();
      if (data) {
        this.setState({ experiences: [...this.state.experiences, data] });
      } else {
        this.setState({ experiences: [...this.state.experiences, id] });
      }
    } else {
      console.log("the answer is empty");
    }
  };

  editExperience = async () => {
    console.log(this.state.postId, "kosdvsdojmsdm");
    console.log(this.state.ex, "kosdvsdojmsdm");
    const getExperience = await fetch(
      url + `/workExperience/edit/` + this.state.postId,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ ...this.state.postExperience }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await getExperience.json();
    if (data) {
      console.log(data, "what edit brings");
      const image = new FormData();
      image.append("image", this.state.image);
      const uploadPhoto = await fetch(
        url + `/workExperience/uploadImage/` + data._id,
        {
          method: "POST",
          credentials: "include",
          body: image,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (uploadPhoto.ok) {
        console.log("imazhi u shtua");
      }
      this.fetchData();
      this.setState({
        postExperience: {
          ...this.state.postExperience,

          workExperience: "",
          description: "",
          started: "",
          finished: "",
          workPosition: "",
        },
      });
      this.fetchData();
    }
  };

  deleteExperience = async (id) => {
    const getExperience = await fetch(url + `/workExperience/delete/` + id, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (getExperience.ok) {
      console.log("is deleted");
      //   this.state.experiences();
      this.fetchData();
    }
  };

  render() {
    console.log(this.state.image, "ca ka mrena");
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
              onClick={this.handleShow}
            >
              Add Experiences
            </Button>
          </Col>

          {this.state.experiences && this.state.experiences.length > 0 ? (
            <>
              {this.state.experiences &&
                this.state.experiences.map((data) => {
                  return (
                    <>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <div className={`${Styles.carts} mt-1`}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              boxShadow:
                                "3px 3px 3px  rgba(212, 212, 212, 0.938)",
                            }}
                          >
                            <div>
                              {data.image ? (
                                <img
                                  className="mt-"
                                  src={data.image}
                                  style={{ width: "80px", height: "80px" }}
                                />
                              ) : (
                                <img
                                  className="mt-3"
                                  src="https://ianmartin.com/wp-content/uploads/2017/10/WhatE28099s20the20Best20Day20of20the20Week20to20Post20a20Job20Ad-1030x687.jpg"
                                  style={{ width: "80px", height: "80px" }}
                                />
                              )}
                            </div>
                            <div className="mt-1">
                              <p>{data.workExperience}</p>
                              <p>{data.workPosition}</p>
                              <p>
                                {data.started}-{data.finished}
                              </p>
                            </div>
                            <div className="mt-1">
                              <RiDeleteBinLine
                                onClick={() => this.deleteExperience(data._id)}
                              />

                              <AiOutlineEdit
                                className="ml-2"
                                onClick={() => this.editShow(data)}
                              />
                            </div>
                          </div>
                          <div className={`${Styles.aboutCarts} ml-1 mr-1`}>
                            <h6>Experience Description</h6>
                            {data.description ? (
                              <p>{data.description}</p>
                            ) : (
                              <p>No Description Detail . </p>
                            )}
                          </div>
                        </div>
                      </Col>
                    </>
                  );
                })}{" "}
            </>
          ) : (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              <div className="mt-5">
                <h6>You have no Experiences</h6>
                <img
                  className="mt-0"
                  src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_1280.png"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
            </Col>
          )}
        </Row>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Work Eperience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 style={{ textAlign: "center" }}>Company</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="name"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postExperience.workExperience}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      workExperience: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>Position</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="surname"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postExperience.workPosition}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      workPosition: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>Work Description</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="aboutMe"
                as="textarea"
                aria-label="With textarea"
                value={this.state.postExperience.description}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      description: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>Started</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="position"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postExperience.started}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      started: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>End Date</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="dateOfBirth"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postExperience.finished}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      finished: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>

            <InputGroup style={{ dispaly: "flex", justifyContent: "center" }}>
              <InputGroup.Prepend>
                <div>
                  <h6> Upload Image</h6>
                  <label
                    for="file-input"
                    aria-required="true"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <BiUpload
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </label>
                  <input
                    className={`${Styles.input}`}
                    key="image"
                    id="file-input"
                    type="file"
                    accept="image/*"
                    profile="file"
                    // value={this.state.image}
                    onChange={(e) =>
                      this.setState({ image: e.target.files[0] })
                    }
                  />
                </div>
              </InputGroup.Prepend>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.postExperience();

                this.handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.editShow}
          onHide={this.editClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Eperience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 style={{ textAlign: "center" }}>Company</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="name"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postExperience.workExperience}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      workExperience: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>Position</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="surname"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postExperience.workPosition}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      workPosition: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>Work Description</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="aboutMe"
                as="textarea"
                aria-label="With textarea"
                value={this.state.postExperience.description}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      description: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>Started</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="position"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postExperience.started}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      started: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>End Date</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="dateOfBirth"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postExperience.finished}
                onChange={(e) =>
                  this.setState({
                    postExperience: {
                      ...this.state.postExperience,
                      finished: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>

            <InputGroup style={{ dispaly: "flex", justifyContent: "center" }}>
              <InputGroup.Prepend>
                <div>
                  <h6> Upload Image</h6>
                  <label
                    for="file-input"
                    aria-required="true"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <BiUpload
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </label>
                  <input
                    className={`${Styles.input}`}
                    key="image"
                    id="file-input"
                    type="file"
                    accept="image/*"
                    profile="file"
                    // value={this.state.image}
                    onChange={(e) =>
                      this.setState({ image: e.target.files[0] })
                    }
                  />
                </div>
              </InputGroup.Prepend>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.editClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.editExperience();

                this.editClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
