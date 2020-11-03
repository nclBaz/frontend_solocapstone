import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal, Tab, Tabs } from "react-bootstrap";
import Styles from "./Styles.module.css";
export default function WorkerProfile(props) {
  const [showEducation, setshowEducation] = useState(false);
  const [showWork, setshowWork] = useState(false);
  const [show, setShow] = useState(false);
  const [profile, setprofile] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchWorker();
  }, [props.profile]);
  const fetchWorker = async () => {
    const result = await fetch(
      "http://localhost:4006/login/singleProfile/" + props.profile,
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
      setprofile(data);
      console.log(data[0].education);
      if (data[0].education && data[0].education.length > 0) {
        setshowEducation(true);
      } else {
        setshowEducation(false);
      }
      if (data[0].workExperience && data[0].workExperience.length > 0) {
        setshowWork(true);
      } else {
        setshowWork(false);
      }
    } else {
      console.log("no data");
    }
  };
  return (
    <>
      {profile &&
        profile.map((data) => {
          return (
            <>
              <Row>
                <Col xs={12} sm={12} md={4} lg={4} className="pl-0">
                  <div className={`${Styles.cartblock1} mt-2 ml-0`}>
                    {data.image ? (
                      <img
                        src={data.image}
                        className="img-responsive mt-2"
                        alt=""
                      />
                    ) : (
                      <img
                        src="https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black.png"
                        className="img-responsive mt-2"
                        alt=""
                      />
                    )}
                    <h3>
                      {data.name} {data.surname}
                    </h3>
                    <h6>{data.position}</h6>
                    <h6>{data.email}</h6>
                    <h6>{data.location}</h6>
                    <h6>{data.dateOfBirth.slice(0, 10)}</h6>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={8} lg={8} className="text-left">
                  <Tabs
                    className="mt-2"
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="Aboutme" title="About Me">
                      <h3>About</h3>
                      <p>{data.aboutMe}</p>
                    </Tab>
                    <Tab eventKey="education" title="Education">
                      <div className={`${Styles.cartblock}`}>
                        <h3>Education History</h3>
                        {data.education && data.education.length > 0 && (
                          <>
                            {data.education[0].image ? (
                              <img
                                src={data.education[0].image}
                                className={`${Styles.images}`}
                              />
                            ) : (
                              <img
                                src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                                className={`${Styles.images}`}
                              />
                            )}

                            <p>{data.education[0].schoolName}</p>
                            <p>{data.education[0].about}</p>
                            <p>{data.education[0].skillsLearned}</p>
                            <p>
                              {data.education[0].startDate}{" "}
                              {data.education[0].endDate}{" "}
                            </p>
                          </>
                        )}
                        {showEducation && (
                          <Button onClick={handleShow}>See All</Button>
                        )}
                      </div>
                    </Tab>
                    <Tab eventKey="workExperience" title="Works ">
                      <h3>Work Experience</h3>
                      {data.workExperience && data.workExperience.length > 0 && (
                        <>
                          {data.workExperience[0].image ? (
                            <img
                              src={data.workExperience[0].image}
                              className={`${Styles.images}`}
                            />
                          ) : (
                            <img
                              src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                              className={`${Styles.images}`}
                            />
                          )}

                          <p>{data.workExperience[0].workExperience}</p>
                          <p>{data.workExperience[0].workPosition}</p>
                          <p>{data.workExperience[0].description}</p>
                          <p>
                            {data.workExperience[0].started}{" "}
                            {data.workExperience[0].finished}{" "}
                          </p>
                        </>
                      )}
                      {showWork && (
                        <Button onClick={handleShow}>See All</Button>
                      )}
                    </Tab>
                    <Tab
                      eventKey="skills"
                      style={{ fontSize: "10px" }}
                      title="Skills"
                    >
                      <h3>Skills</h3>
                      {data.skills &&
                        data.skills.map((info) => {
                          return (
                            <>
                              <Button variant="light">{info.skillName}</Button>
                            </>
                          );
                        })}
                    </Tab>
                  </Tabs>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{
                    position: " -webkit-sticky !important",
                    position: "fixed !important",
                    top: 0,

                    display: "flex",
                    justifyContent: "flex-end",
                    backgroundColor: "rgb(255, 255, 255)",
                    zIndex: 1,
                  }}
                  className={`mt-0`}
                >
                  <Button className={` mr-1 ${Styles.btngrad}`}>Accept</Button>
                  <Button className={` mr-1 ${Styles.btngrad}`}>Remove</Button>
                </Col>
              </Row>
            </>
          );
        })}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
