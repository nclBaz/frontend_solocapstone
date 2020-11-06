import React from "react";
import Styles from "./Styles.module.css";
import { Col, Row, Button, Modal } from "react-bootstrap";
export default function Education(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Education History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row
            className={` ${Styles.aboutme} justify-content-space-around text-left m-0 p-0`}
          >
            {props.education &&
              props.education.length > 0 &&
              props.education.map((data) => {
                return (
                  <>
                    <Col xs={4} sm={4} md={4} lg={4}>
                      {data.image ? (
                        <img
                          src={data.image}
                          className={`${Styles.images} mt-5 ml-2`}
                          style={{ borderRadius: 0 }}
                        />
                      ) : (
                        <img
                          src="https://koosrajramanah.com/wp-content/uploads/2016/08/education.png"
                          className={`${Styles.images} mt-5  ml-2`}
                          style={{ borderRadius: 0 }}
                        />
                      )}
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} style={{ height: "auto" }}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <h5>{data.schoolName}</h5>
                        <p className="ml-5 ">
                          <i>
                            {data.startDate} -{data.endDate}{" "}
                          </i>
                        </p>
                      </div>

                      <p>{data.about}</p>
                      <p>{data.skillsLearned}</p>
                    </Col>
                  </>
                );
              })}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
