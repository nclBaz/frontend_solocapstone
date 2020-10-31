import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import Styles from "./Styles.module.css";
export default function WorkerProfile(props) {
  return (
    <>
      {props.profile &&
        props.profile.map((data) => {
          return (
            <>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  {data.image ? (
                    <img src={data.image} className={`${Styles.images}`} />
                  ) : (
                    <img
                      className={`${Styles.images}`}
                      src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                    />
                  )}
                  <p className={`${Styles.title}`}>
                    {data.name} {data.surname}
                  </p>
                  <p className={`${Styles.normalText}`}>{data.position}</p>

                  <p className={`${Styles.normalText}`}>{data.email}</p>
                  <p className={`${Styles.normalText}`}>{data.location}</p>
                  <p className={`${Styles.normalText}`}>{data.dateOfBirth}</p>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  {props.basicData && (
                    <>
                      <h3>About</h3>
                      <p>{data.aboutMe}</p>
                    </>
                  )}
                  {props.education && (
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
                  {props.workExperience && (
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
                  {props.skills && (
                    <>
                      <h3>Skills</h3>
                      {data.skills &&
                        data.skills.map((info) => {
                          return (
                            <>
                              <Button variant="light">{info.skillName}</Button>
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
    </>
  );
}
