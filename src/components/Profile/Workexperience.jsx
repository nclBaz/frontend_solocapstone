import React, { Component } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

import Styles from "./Styles.module.css";
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
    const getExperience = await fetch(
      `http://localhost:4006/workExperience/workExperience`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await getExperience.json();
    this.setState({ experiences: data });
    console.log(data, "where are the data");
  };

  postExperience = async () => {
    const getExperience = await fetch(
      `http://localhost:4006/workExperience/postWork`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ ...this.state.postExperience }),
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }),
      }
    );

    const id = await getExperience.json();
    console.log(id, "what have inside");
    if (id) {
      const image = new FormData();
      image.append("image", this.state.image);
      const uploadPhoto = await fetch(
        `http://localhost:4006/workExperience/uploadImage/` + id._id,
        {
          method: "POST",
          credentials: "include",
          body: image,
          headers: {
            "Access-Control-Allow-Origin": "*",
            // "Content-Type": "application/json",
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
      `http://localhost:4006/workExperience/edit/` + this.state.postId,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ ...this.state.postExperience }),
        headers: {
          "Access-Control-Allow-Origin": "*",
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
        `http://localhost:4006/workExperience/uploadImage/` + data._id,
        {
          method: "POST",
          credentials: "include",
          body: image,
          headers: {
            "Access-Control-Allow-Origin": "*",
            // "Content-Type": "application/json",
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
    const getExperience = await fetch(
      `http://localhost:4006/workExperience/delete/` + id,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );

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
        <div style={{ backgroundColor: "white" }}>
          <Row>
            <Col xs={8} sm={7} md={7} lg={7}>
              <h4 className="ml-auto">Work Experiences</h4>
            </Col>
            <Col xs={3} sm={4} md={4} lg={4} className="text-right mr-4 ">
              <BiAddToQueue
                style={{ fontSize: "25px", paddingTop: "5px" }}
                onClick={this.handleShow}
              />
            </Col>
          </Row>
          <div>
            {this.state.experiences && this.state.experiences.length > 0 ? (
              <>
                {this.state.experiences &&
                  this.state.experiences.map((data) => {
                    return (
                      <>
                        <Row>
                          <Col xs={4} sm={4} md={4} lg={4} className="mb-1">
                            {data.image ? (
                              <img
                                src={data.image}
                                className={`${Styles.img}`}
                              />
                            ) : (
                              <img
                                src="https://images.idgesg.net/images/article/2019/05/cso_best_security_software_best_ideas_best_technology_lightbulb_on_horizon_of_circuit_board_landscape_with_abstract_digital_connective_technology_atmosphere_ideas_innovation_creativity_by_peshkov_gettyimages-965785212_3x2_2400x1600-100797318-large.jpg"
                                className={`${Styles.img}`}
                              />
                            )}
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <p>{data.workExperience}</p>
                            <p>{data.workPosition}</p>
                            <p>
                              {" "}
                              {data.started} {data.finished}
                            </p>
                          </Col>

                          {/* <Col xs={2} sm={2} md={2} lg={2}> */}
                          {/* <h6 onClick={() => this.editShow(data)}>Edit</h6>
                            <p onClick={() => this.deleteExperience(data._id)}>
                              Delete
                            </p> */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <FiEdit onClick={() => this.editShow(data)} />
                            <AiFillDelete
                              onClick={() => this.deleteExperience(data._id)}
                            />

                            {/* </Col> */}
                          </div>
                          <Row className={`${Styles.experience} ml-1 mt-0`}>
                            <Col xs={12} sm={12} md={12} lg={12}>
                              <p>{data.description}</p>
                            </Col>
                          </Row>
                        </Row>
                      </>
                    );
                  })}{" "}
              </>
            ) : (
              <Row>
                <Col>
                  <div>
                    <p> Please add Experiences!!!!!!</p>
                  </div>
                </Col>{" "}
              </Row>
            )}
          </div>
        </div>
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
