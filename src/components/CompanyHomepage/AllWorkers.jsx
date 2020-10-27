import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Carousel,
  CloseButton,
  DropdownButton,
} from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "./Profile";
import Styles from "./Styles.module.css";
import { Link } from "react-router-dom";
export default function AllWorkers() {
  const [allJob, setAllJob] = useState([]);
  const [singleJob, setSingelJob] = useState([]);
  const [profile, setProfile] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    allPost();
  }, []);

  const allPost = async () => {
    const data = await fetch("http://localhost:4006/post/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const allPost = await data.json();
    if (allPost) {
      setAllJob(allPost);
      setSingelJob(allPost[0]);
      console.log("fetch is ok");
    } else {
      console.log("there is no data ");
    }
  };

  const getSingleAplication = (post) => {
    setSingelJob(post);
    console.log(singleJob);
  };
  const fetchWorker = async (id) => {
    const result = await fetch(
      "http://localhost:4006/login/singleProfile/" + id,
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
    setProfile(data);
  };

  //   http://localhost:4006/login/5f7dff6aefc7f21ff84fb72b/pdf
  const getPDF = async (id) => {
    const result = await fetch(`http://localhost:4006/login/${id}/pdf`, {
      method: "GET",
      credentials: "include",
    });
    if (result.ok) {
      console.log("u shakarkua");
    }
  };

  return (
    <>
      <Row className={`${Styles.company}`}>
        <Col xs={12} sm={12} md={12} lg={7} className={``}>
          <div>
            {" "}
            <Carousel
              className={`${Styles.next}`}
              interval={800000000000000000000}
            >
              {allJob &&
                allJob.map((post) => {
                  return (
                    <Carousel.Item
                      style={{ height: "500px", borderRadius: "20px" }}
                    >
                      <Carousel.Caption>
                        <Row
                          className={`${Styles.companyCard} mt-5`}
                          style={{
                            backgroundColor: "white",
                          }}
                          //   onClick={() => setSingelJob(post.allAplication)}
                        >
                          <Row>
                            <Col
                              xs={12}
                              sm={12}
                              md={4}
                              lg={4}
                              className={`${Styles.col}`}
                            >
                              <Card.Img
                                className={`${Styles.img} mt-4`}
                                src="https://www.okayapower.com/img/inner-banner/group-company.jpg"
                                alt="Card image"
                              />
                            </Col>
                            <Col
                              xs={12}
                              sm={12}
                              md={8}
                              lg={8}
                              style={{
                                height: "135px",
                                // outline: "2px red solid",
                              }}
                            >
                              <Card className={`${Styles.card2}`}>
                                <Card.Header
                                  style={{
                                    fontWeight: "bolder",
                                    fontSize: "25px",
                                    backgroundColor: "transparent",
                                    borderBottom: "none",
                                    color: "rgb(168, 50, 7)",
                                  }}
                                >
                                  Position: {post.jobPosition}
                                </Card.Header>

                                <Card.Body
                                  className="pt-0"
                                  style={{ borderRadius: "20px !important" }}
                                >
                                  <Card.Title style={{ color: "black" }}>
                                    Salary: {post.salary}
                                  </Card.Title>
                                  <Card.Title
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {" "}
                                    <p style={{ color: "black" }}>
                                      {" "}
                                      Total Aplicant :{" "}
                                      {post.allAplication.length}
                                    </p>
                                    <Button
                                      variant="light"
                                      className={`${Styles.button}`}
                                      onClick={() =>
                                        setSingelJob(post.allAplication)
                                      }
                                    >
                                      {" "}
                                      See All
                                    </Button>{" "}
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className={`${Styles.description} mt-0`}
                            >
                              <Card
                                style={{
                                  // fontWeight: "bold",
                                  fontSize: "25px",
                                  backgroundColor: "transparent",
                                  borderBottom: "none",
                                  color: "black",
                                  borderTop: "none",
                                }}
                              >
                                <Card.Body className="pt-0">
                                  <Card.Title>
                                    Location:{post.location}
                                  </Card.Title>
                                  <Card.Text
                                    className={`${Styles.description}`}
                                  >
                                    Desc: {post.jobDescription}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Row>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={4}
          className={`${Styles.dropDown} ${Styles.aplication}  mt-5 `}
        >
          {singleJob.length > 0 &&
            singleJob.map((aplied) => {
              return (
                <>
                  <Row className={`${Styles.singleRow} mr-2 mt-4 ml-2`}>
                    <Col
                      xs={3}
                      sm={3}
                      md={3}
                      lg={3}
                      className=""
                      style={{ width: "150px", textAlign: "center" }}
                    >
                      <img
                        className={`${Styles.images}  mt-2`}
                        src="https://www.okayapower.com/img/inner-banner/group-company.jpg"
                      />
                    </Col>
                    <Col xs={7} sm={7} md={7} lg={7}>
                      <h3>
                        {aplied.name.toUpperCase()}{" "}
                        {aplied.surname.toUpperCase()}
                      </h3>
                      <h4> {aplied.position}</h4>
                      <h6>{aplied.email}</h6>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2}>
                      <Dropdown className={` ${Styles.dropdownToggle} `}>
                        <Dropdown.Toggle
                          style={{
                            border: "none",
                            boxShadow: "none",
                            height: "50px",
                          }}
                          className={` ${Styles.dropdownToggle} `}
                          variant="light"
                          id="dropdown-basic"
                        >
                          {" "}
                          <BsThreeDotsVertical />
                          {/* <BsThreeDots style={{ fontSize: "35px" }} /> */}
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          // className={`${mainStyle.bg}`}
                          style={{
                            backgroundColor: "#0f1f26",
                          }}
                        >
                          <p
                            onClick={() => {
                              fetchWorker(aplied._id);
                              handleShow();
                            }}
                          >
                            Full Profile
                          </p>

                          <Dropdown.Item
                            className="text-center"
                            style={{ height: "30px" }}
                            href={`http://localhost:4006/login/${aplied._id}/pdf`}
                          >
                            <p onClick={() => getPDF(aplied._id)}>
                              Download PDF
                            </p>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </>
              );
            })}
        </Col>
        <Col xs={12} sm={12} md={12} lg={1}></Col>
      </Row>
      <Modal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        fullProfile={profile}
      />
    </>
  );
}
