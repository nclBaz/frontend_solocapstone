import React, { useState } from "react";
import Styles from "./Styles.module.css";
import { Col, Row, Button, Modal } from "react-bootstrap";
export default function Workexperience(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Work Experiences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.workExperience &&
            props.workExperience.length > 0 &&
            props.workExperience.map((data) => {
              return (
                <>
                  {" "}
                  <Row
                    className={`${Styles.aboutme2} justify-content-space-bettwen text-left m-0 p-0 mt-3 `}
                  >
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Row>
                        <Col
                          xs={5}
                          sm={5}
                          md={5}
                          lg={5}
                          className="text-center"
                        >
                          {data.image ? (
                            <img
                              src={data.image}
                              className={`${Styles.images} mt-1 `}
                              style={{ borderRadius: 0 }}
                            />
                          ) : (
                            <img
                              src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                              className={`${Styles.images} mt-1  `}
                              style={{ borderRadius: 0 }}
                            />
                          )}
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={7}>
                          <div
                            style={{
                              display: "flex",
                            }}
                            className="mt-1 "
                          >
                            <h5>
                              {data.workExperience && data.workExperience}
                            </h5>
                            <p className="ml-2 ">
                              <i>
                                {data.started} -{data.finished}{" "}
                              </i>
                            </p>
                          </div>
                          <div>
                            {" "}
                            <h5>{data.workPosition}</h5>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <div style={{ textAlign: "left" }} className="mt-4">
                        <h5>Work Description</h5>
                        <p>{data.description}</p>
                      </div>
                    </Col>{" "}
                  </Row>
                </>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            style={{ border: 0 }}
            className={`${Styles.btngrad}`}
            onClick={props.handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
