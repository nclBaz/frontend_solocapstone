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
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import Pagination from "./Pagination";

import Styles from "./Styles.module.css";
import { Link } from "react-router-dom";
export default function AllWorkers() {
  const [allJob, setAllJob] = useState([]);
  const [singleJob, setSingelJob] = useState([]);
  const [profile, setProfile] = useState([]);
  const [aplicant, setaplicant] = useState([]);
  const [basicData, setBasicData] = useState(true);
  const [education, setEducation] = useState(false);
  const [workExperience, setWorkExperience] = useState(false);
  const [skills, setSkills] = useState(false);

  // const [notes, setNotes] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [aplicantPerPage] = useState(3);

  const indexOfLastPost = currentPage * aplicantPerPage;
  const indexOfFirstPost = indexOfLastPost - aplicantPerPage;
  const currentAplicant = aplicant.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      console.log(allPost);
    } else {
      console.log("there is no data ");
    }
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
    if (data) {
      setProfile(data);
    } else {
      console.log("no data");
    }
  };

  const getPosts = (allAplication) => {
    const data = allAplication;
    setaplicant(data);
    setProfile([]);
    about();
  };

  const about = (e) => {
    setBasicData(true);
    setEducation(false);
    setWorkExperience(false);
    setSkills(false);
  };

  const educationData = () => {
    setBasicData(false);
    setEducation(true);
    setWorkExperience(false);
    setSkills(false);
  };
  const workData = () => {
    setBasicData(false);
    setEducation(false);
    setWorkExperience(true);
    setSkills(false);
  };
  const skillsData = () => {
    setBasicData(false);
    setEducation(false);
    setWorkExperience(false);
    setSkills(true);
  };

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
        <Col xs={12} sm={12} md={5} lg={5} className="mt-1">
          <div
            style={{
              border: "solid 2px  rgb(63, 69, 95)",
              backgroundColor: "rgb(255, 255, 255)",
            }}
            className={`${Styles.next} ${Styles.dropDown}  `}
          >
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              // className={`${Styles.text}mt-0 mb-5`}
              style={{
                backgroundColor: "white",
                zIndex: "10",
                position: "-webkit-sticky",
                position: "sticky",
                top: "0",
                height: "100px",
              }}
            >
              <h6>hello</h6>
            </Col>
            <div className="mt-3">
              {allJob &&
                allJob.map((data) => {
                  return (
                    <>
                      <Row
                        className={`${Styles.singleRow} mb-3 mr-2 ml-2  `}
                        onClick={() => getPosts(data.allAplication)}
                      >
                        <Col
                          xs={12}
                          sm={12}
                          md={6}
                          lg={6}
                          className={`${Styles.carts}`}
                        >
                          <p
                            style={{
                              color: "   rgb(63, 69, 95)",
                              fontWeight: "bolder",
                            }}
                          >
                            Position: {data.jobPosition}
                          </p>
                          <p
                            style={{
                              color: " rgb(63, 69, 95)",
                              fontWeight: "bolder",
                            }}
                          >
                            Apliaction: {data.allAplication.length}
                          </p>
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={6}
                          lg={6}
                          className={`${Styles.carts}`}
                        >
                          <p
                            style={{
                              color: " rgb(63, 69, 95)",
                              fontWeight: "bolder",
                            }}
                          >
                            Created: {data.createdAt.slice(0, 10)}
                          </p>
                          <p
                            style={{
                              color: " rgb(63, 69, 95)",
                              fontWeight: "bolder",
                            }}
                          >
                            Salary: {data.salary}
                          </p>
                        </Col>
                      </Row>
                    </>
                  );
                })}
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={7}
          lg={7}
          className={` ${Styles.aplication}  mt-1 `}
        >
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="mt-1"
            style={{
              height: "200px",
              borderBottom: "2px solid grey",
            }}
          >
            <Row>
              {currentAplicant &&
                currentAplicant.map((data) => {
                  return (
                    <>
                      <Col xs={4} sm={4} md={4} lg={4}>
                        <Card
                          className={`${Styles.aply}  `}
                          onClick={() => {
                            fetchWorker(data._id);
                            about();
                          }}
                        >
                          {data.image ? (
                            <Card.Img
                              variant="top"
                              src={data.image}
                              className={`${Styles.imagesCard}  `}
                            />
                          ) : (
                            <Card.Img
                              variant="top"
                              className={`${Styles.imagesCard}  `}
                              src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                            />
                          )}

                          <Card.Text
                            className={` ${Styles.textCard} mt-2 mb-0 text-center`}
                          >
                            <Row className={`${Styles.textRow}`}>
                              {" "}
                              <FaUserAlt className={`${Styles.icon}`} />{" "}
                              <p
                                className={`${Styles.titleCard} ${Styles.textCard}  `}
                              >
                                {data.name} {data.surname}
                              </p>
                            </Row>
                          </Card.Text>
                          <Card.Text className={` ${Styles.textCard} ml-1   `}>
                            <Row className={`${Styles.textRow}`}>
                              <BsFillBriefcaseFill
                                style={{ marginTop: "3px" }}
                                className={`${Styles.icon} ml-0`}
                              />{" "}
                              <p
                                className={`${Styles.normalText} ${Styles.textCard}`}
                              >
                                {" "}
                                {data.position}
                              </p>
                            </Row>
                          </Card.Text>
                          {/* </Card.Body> */}
                        </Card>
                      </Col>
                    </>
                  );
                })}
              <Col xs={12} sm={12} md={12} lg={12} className="mt-1 ">
                <Pagination
                  aplicantPerPage={aplicantPerPage}
                  totalAplicant={aplicant.length}
                  paginate={paginate}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} className="mt-1">
            <Col xs={12} sm={12} md={12} lg={12}>
              <Button
                id="button"
                className={`mr-1 ${Styles.btngrad}`}
                onClick={(e) => about(e)}
              >
                Profile
              </Button>
              <Button
                className={`mr-1 ${Styles.btngrad}`}
                onClick={() => educationData()}
              >
                Education
              </Button>
              <Button
                className={`mr-1 ${Styles.btngrad}`}
                onClick={() => workData()}
              >
                Work Experience
              </Button>
              <Button
                className={`mr-1 ${Styles.btngrad}`}
                onClick={() => skillsData()}
              >
                Skills
              </Button>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className={`${Styles.dropDown123}`}
            >
              {profile &&
                profile.map((data) => {
                  return (
                    <>
                      <Row>
                        <Col xs={6} sm={6} md={6} lg={6}>
                          {data.image ? (
                            <img
                              src={data.image}
                              className={`${Styles.images}`}
                            />
                          ) : (
                            <img
                              className={`${Styles.images}`}
                              src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                            />
                          )}
                          <p className={`${Styles.title}`}>
                            {data.name} {data.surname}
                          </p>
                          <p className={`${Styles.normalText}`}>
                            {data.position}
                          </p>

                          <p className={`${Styles.normalText}`}>{data.email}</p>
                          <p className={`${Styles.normalText}`}>
                            {data.location}
                          </p>
                          <p className={`${Styles.normalText}`}>
                            {data.dateOfBirth}
                          </p>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                          {basicData && (
                            <>
                              <h3>About</h3>
                              <p>{data.aboutMe}</p>
                            </>
                          )}
                          {education && (
                            <>
                              <h3>Education History</h3>
                              {data.education &&
                                data.education.map((info) => {
                                  return (
                                    <>
                                      {info.image ? (
                                        <img
                                          src={info.image}
                                          className={`${Styles.images}`}
                                        />
                                      ) : (
                                        <img
                                          src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                                          className={`${Styles.images}`}
                                        />
                                      )}

                                      <p>{info.schoolName}</p>
                                      <p>{info.about}</p>
                                      <p>{info.skillsLearned}</p>
                                      <p>
                                        {info.startDate} {info.endDate}{" "}
                                      </p>
                                    </>
                                  );
                                })}
                            </>
                          )}
                          {workExperience && (
                            <>
                              <h3>Work Experience</h3>
                              {data.workExperience &&
                                data.workExperience.map((info) => {
                                  return (
                                    <>
                                      {info.image ? (
                                        <img
                                          src={info.image}
                                          className={`${Styles.images}`}
                                        />
                                      ) : (
                                        <img
                                          src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                                          className={`${Styles.images}`}
                                        />
                                      )}

                                      <p>{info.workExperience}</p>
                                      <p>{info.workPosition}</p>
                                      <p>{info.description}</p>
                                      <p>
                                        {info.started} {info.finished}{" "}
                                      </p>
                                    </>
                                  );
                                })}
                            </>
                          )}
                          {skills && (
                            <>
                              <h3>Skills</h3>
                              {data.skills &&
                                data.skills.map((info) => {
                                  return (
                                    <>
                                      <Button variant="light">
                                        {info.skillName}
                                      </Button>
                                    </>
                                  );
                                })}
                            </>
                          )}
                        </Col>
                      </Row>
                    </>
                  );
                })}
            </Col>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{
              position: "absolute",
              bottom: "0",
              display: "flex",
            }}
          >
            <Button className={`mr-1  ml-3  ${Styles.btngrad}`}>Get PDF</Button>
            <Button className={` mr-1 ${Styles.btngrad}`} onClick={handleShow}>
              Send Email
            </Button>
            <Button className={` mr-1 ${Styles.btngrad}`}>Accept</Button>
            <Button className={` mr-1 ${Styles.btngrad}`}>Remove</Button>
          </Col>
        </Col>
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
