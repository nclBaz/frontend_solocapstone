import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import Styles from "./Styles.module.css";
export default function AllWorkers() {
  const [allJob, setAllJob] = useState([]);
  const [singleJob, setSingelJob] = useState([]);

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
  console.log(allJob, "what has inside");
  const getSingleAplication = (post) => {
    setSingelJob(post);
    console.log(singleJob);
  };

  return (
    <>
      <Row className={`${Styles.company}`}>
        <Col
          xs={12}
          sm={12}
          md={7}
          lg={7}
          className={`${Styles.dropDown} , mt-5`}
        >
          <h4 className={`${Styles.text}`}>All Jobs</h4>
          <div>
            {allJob &&
              allJob.map((post) => {
                return (
                  <>
                    {" "}
                    <div
                      className={`${Styles.card} mb-5`}
                      style={{ outline: "2px red solid" }}
                    >
                      <div>
                        <Card.Img
                          className="mt-4"
                          style={{
                            height: "100px",
                            width: "150px",
                            outline: "2px red solid",
                          }}
                          src="https://www.okayapower.com/img/inner-banner/group-company.jpg"
                          alt="Card image"
                        />
                      </div>
                      <Card
                        border="primary"
                        style={{ width: "25rem", height: "12rem" }}
                      >
                        <Card.Header
                          style={{ fontWeight: "bold", fontSize: "25px" }}
                        >
                          {post.jobPosition}
                        </Card.Header>

                        <Card.Body>
                          <Card.Title>{post.salary}</Card.Title>
                          <Card.Text className={`${Styles.about}`}>
                            {post.jobDescription}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </>
                );
              })}
          </div>
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} className="mt-5">
          {singleJob && (
            // <div className={`${Styles.card}`}>
            <>
              <Card style={{ height: "500px" }}>
                {" "}
                {singleJob.image ? (
                  <Card.Img
                    src={singleJob.image}
                    style={{ display: "flex", height: "200px" }}
                    variant="top"
                  />
                ) : (
                  <Card.Img
                    style={{ display: "flex", height: "200px" }}
                    src={singleJob.image}
                    src="https://www.okayapower.com/img/inner-banner/group-company.jpg"
                    variant="top"
                  />
                )}
                <Card.Body className="mt-0">
                  <Card.Title>{singleJob.jobPosition}</Card.Title>
                  <Card.Title>{singleJob.salary}</Card.Title>
                  <Card.Title>{singleJob.location}</Card.Title>
                </Card.Body>
                <Card.Body>
                  <Button>Show Aplication</Button>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
