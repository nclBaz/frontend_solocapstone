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
          md={3}
          lg={3}
          className={`${Styles.dropDown} , mt-5`}
        >
          <h4 className={`${Styles.text}`}>All Jobs</h4>
          <div>
            {allJob &&
              allJob.map((post) => {
                return (
                  <Dropdown.Item
                    style={{ display: "flex", justifyContent: "center" }}
                    key={post._id}
                    onClick={() => getSingleAplication(post)}
                  >
                    {post.jobPosition}
                  </Dropdown.Item>
                );
              })}
          </div>
        </Col>
        <Col xs={12} sm={12} md={9} lg={9} className="mt-5">
          {singleJob && (
            <div className={`${Styles.card}`}>
              <Col xs={4} sm={4} md={4} lg={4}>
                {" "}
                {singleJob.image ? (
                  <Card.Img
                    src={singleJob.image}
                    style={{ display: "flex", height: "300px" }}
                    variant="top"
                  />
                ) : (
                  <Card.Img
                    style={{ display: "flex", height: "300px" }}
                    src={singleJob.image}
                    src="https://www.okayapower.com/img/inner-banner/group-company.jpg"
                    variant="top"
                  />
                )}
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                <Card.Body>
                  <Card.Title>{singleJob.jobPosition}</Card.Title>
                  <Card.Title>{singleJob.description}</Card.Title>
                  <Card.Title>{singleJob.about}</Card.Title>
                  <Card.Title>{singleJob.salary}</Card.Title>
                  <Card.Title>{singleJob.location}</Card.Title>
                </Card.Body>
                <ListGroup
                  className="list-group-flush"
                  className={`${Styles.company}`}
                >
                  <ListGroupItem>
                    {singleJob.benefites &&
                      singleJob.benefites.map((x) => {
                        return <>{x}</>;
                      })}
                  </ListGroupItem>
                </ListGroup>
                <ListGroup
                  className="list-group-flush"
                  className={`${Styles.company}`}
                >
                  <ListGroupItem>
                    {singleJob.requirments &&
                      singleJob.requirments.map((x) => {
                        return <>{x}</>;
                      })}{" "}
                  </ListGroupItem>
                  <Card.Body>
                    <Button>Show Aplication</Button>
                  </Card.Body>
                </ListGroup>
              </Col>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}
