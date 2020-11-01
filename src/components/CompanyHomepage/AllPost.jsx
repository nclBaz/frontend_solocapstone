import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./Styles.module.css";
export default function AllPost(props) {
  return (
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
        {props.allJob &&
          props.allJob.map((data) => {
            return (
              <>
                <Row
                  className={`${Styles.singleRow} mb-3 mr-2 ml-2  `}
                  onClick={() => {
                    props.getPosts(data.allAplication, data._id);
                    props.hideButton();
                  }}
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
  );
}
