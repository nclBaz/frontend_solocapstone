import React, { Component } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Styles from "./Styles.module.css";
export default class Education extends Component {
  state = {
    education: [],
    postEducation: {
      schoolName: "",
      about: "",
      startDate: "",
      endDate: "",
      skillsLearned: "",
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
      postEducation: {
        ...this.state.postEducation,

        schoolName: "",
        about: "",
        startDate: "",
        endDate: "",
        skillsLearned: "",
      },
    });
  };

  editClose = () => this.setState({ editShow: false });
  editShow = (data) => {
    this.setState({ editShow: true });
    console.log(data, "ipushihskjdkjhsdkj");
    this.setState({
      postEducation: {
        ...this.state.postEducation,
        schoolName: data.schoolName,
        about: data.about,
        startDate: data.startedDate,
        endDate: data.endDate,
        skillsLearned: data.skillsLearned,
      },
    });
    this.setState({ postId: data._id });
  };

  componentDidMount = async () => {
    this.fetchData();
  };
  fetchData = async () => {
    const getEducation = await fetch(
      `http://localhost:4006/education/allEducation`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await getEducation.json();
    this.setState({ education: data });
    console.log(data, "where are the data");
  };

  postEducation = async () => {
    const getEducation = await fetch(
      `http://localhost:4006/education/postEducation`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(this.state.postEducation),
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }),
      }
    );

    const id = await getEducation.json();
    console.log(id, "what have inside");
    if (id) {
      const image = new FormData();
      image.append("image", this.state.image);
      const uploadPhoto = await fetch(
        `http://localhost:4006/education/uploadImage/` + id,
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
        const data = await uploadPhoto.json();
        console.log(data, "education  ");
        this.setState({ education: [...this.state.education, data] });
      }
      this.handleClose();
      this.setState({ image: "" });
      this.setState({
        postEducation: {
          ...this.state.postEducation,

          schoolName: "",
          about: "",
          startDate: "",
          endDate: "",
          skillsLearned: "",
        },
      });
    } else {
      console.log("the answer is empty");
    }
  };

  editEducation = async () => {
    console.log(this.state.postId, "kosdvsdojmsdm");
    console.log(this.state.ex, "kosdvsdojmsdm");
    const getEducation = await fetch(
      `http://localhost:4006/education/edit/` + this.state.postId,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ ...this.state.postEducation }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await getEducation.json();
    if (data) {
      console.log(data, "what edit brings");
      const image = new FormData();
      image.append("image", this.state.image);
      const uploadPhoto = await fetch(
        `http://localhost:4006/education/uploadImage/` + data._id,
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
      this.setState({ image: "" });
      this.setState({
        postEducation: {
          ...this.state.postEducation,

          schoolName: "",
          about: "",
          startDate: "",
          endDate: "",
          skillsLearned: "",
        },
      });
      this.editClose();
    }
    this.fetchData();
  };

  deleteEducation = async (id) => {
    const getEducation = await fetch(
      `http://localhost:4006/education/delete/` + id,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );

    if (getEducation.ok) {
      console.log("is deleted");
      //   this.state.experiences();
      this.fetchData();
    }
  };

  render() {
    console.log(this.state.image, "ca ka mrena");
    return (
      <>
        <div>
          <Row>
            <Col xs={8} sm={7} md={7} lg={7}>
              <h4>Education History</h4>
            </Col>
            <Col xs={3} sm={4} md={4} lg={4} className="text-right mr-4 ">
              <BiAddToQueue
                onClick={this.handleShow}
                style={{ fontSize: "25px", paddingTop: "5px" }}
              />
            </Col>
          </Row>
          <div>
            <>
              {this.state.education && this.state.education.length > 0 ? (
                this.state.education.map((data) => {
                  return (
                    <>
                      <Row>
                        <Col xs={4} sm={4} md={4} lg={4} className="mb-1">
                          {data.image ? (
                            <img src={data.image} className={`${Styles.img}`} />
                          ) : (
                            <img
                              src="https://images.idgesg.net/images/article/2019/05/cso_best_security_software_best_ideas_best_technology_lightbulb_on_horizon_of_circuit_board_landscape_with_abstract_digital_connective_technology_atmosphere_ideas_innovation_creativity_by_peshkov_gettyimages-965785212_3x2_2400x1600-100797318-large.jpg"
                              className={`${Styles.img}`}
                            />
                          )}
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                          <p>{data.schoolName}</p>
                          <p>{data.skillsLearned}</p>
                          <p>
                            {data.startDate} {data.endDate}
                          </p>
                        </Col>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <FiEdit onClick={() => this.editShow(data)} />
                          <AiFillDelete
                            onClick={() => this.deleteEducation(data._id)}
                          />
                        </div>
                      </Row>

                      <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={`${Styles.experience} ml-1 mt-0`}
                      >
                        <p>{data.about}</p>
                      </Col>
                    </>
                  );
                })
              ) : (
                <Row>
                  <Col>
                    <div>
                      <p> Please add Education!!!!!!</p>
                    </div>
                  </Col>{" "}
                </Row>
              )}
            </>
          </div>
        </div>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Education</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 style={{ textAlign: "center" }}>SchoolName</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="name"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postEducation.schoolName}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      schoolName: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>SkillsLearned</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="surname"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.postEducation.skillsLearned}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      skillsLearned: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}>About Education</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="aboutMe"
                as="textarea"
                aria-label="With textarea"
                value={this.state.postEducation.about}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      about: e.currentTarget.value,
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
                value={this.state.postEducation.startDate}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      startDate: e.currentTarget.value,
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
                value={this.state.postEducation.endDate}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      endDate: e.currentTarget.value,
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
                this.postEducation();
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
                value={this.state.postEducation.schoolName}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      schoolName: e.currentTarget.value,
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
                value={this.state.postEducation.skillsLearned}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      skillsLearned: e.currentTarget.value,
                    },
                  })
                }
              />
            </InputGroup>
            <h6 style={{ textAlign: "center" }}> Description</h6>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="aboutMe"
                as="textarea"
                aria-label="With textarea"
                value={this.state.postEducation.about}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      about: e.currentTarget.value,
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
                value={this.state.postEducation.startDate}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      startDate: e.currentTarget.value,
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
                value={this.state.postEducation.endDate}
                onChange={(e) =>
                  this.setState({
                    postEducation: {
                      ...this.state.postEducation,
                      endDate: e.currentTarget.value,
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
                this.editEducation();
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
