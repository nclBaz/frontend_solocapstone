import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Styles from "./Styles.module.css";

export default function Profile(props) {
  console.log(props.fullProfile, "hello from the other side");
  // const [singelUser, setsingelUser] = useState([]);

  // useEffect(() => {}, [props.fullProfile]);
  // const singleFetch = async () => {
  //   const result = await fetch(
  //     "http://localhost:4006/login/singleProfile/" + props.fullProfile._id,
  //     {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await result.json();
  //   setsingelUser(data);
  //   console.log("u kry");
  // };
  // console.log(singelUser, "ca ka mrena");

  return (
    <div>
      <>
        <Modal
          show={props.show}
          onHide={props.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.fullProfile.map((data) => {
              return (
                <>
                  <Row>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        {data.image && data.image.length > 0 ? (
                          <img
                            src={data.image}
                            className={`${Styles.imageModal}`}
                          />
                        ) : (
                          <img
                            src="https://www.okayapower.com/img/inner-banner/group-company.jpg"
                            className={`${Styles.imageModal}`}
                          />
                        )}
                        <p key={data._id}>
                          Full Name :{data.name} {data.surname}
                        </p>
                        <p>Position:{data.position} </p>
                        <p>Email:{data.email}</p>
                        <p>Location :{data.location}</p>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <p>About : {data.aboutMe}</p>
                      </Col>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {data.education &&
                        data.education.map((education) => {
                          return (
                            <>
                              <Row>
                                <h4>Education History</h4>
                                <Col
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <img
                                    src={education.image}
                                    className={`${Styles.imageModal1}`}
                                  />
                                  <p>{education.schoolName}</p>
                                </Col>{" "}
                                <Col xs={12} sm={12} md={12} lg={12}>
                                  <p>{education.about}</p>
                                  <p>{education.skillsLearned}</p>
                                  <p>
                                    {education.startDate} : {education.endDate}
                                  </p>
                                </Col>{" "}
                              </Row>
                            </>
                          );
                        })}

                      {data.workExperience &&
                        data.workExperience.map((education) => {
                          return (
                            <>
                              <Row>
                                <h4>Work Experience</h4>
                                <Col
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <img
                                    src={education.image}
                                    className={`${Styles.imageModal1}`}
                                  />{" "}
                                  <p>{education.workExperience}</p>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                  <p>{education.workPosition}</p>
                                  <p>{education.description}</p>
                                  <p>
                                    {education.started} : {education.finished}
                                  </p>
                                </Col>
                              </Row>
                            </>
                          );
                        })}
                      {data.skills &&
                        data.skills.map((skills) => {
                          return (
                            <>
                              <Row>
                                {" "}
                                <h4>Skills</h4>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                  <p>{skills.skillName}</p>
                                </Col>
                              </Row>
                            </>
                          );
                        })}
                    </Col>
                  </Row>
                </>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
