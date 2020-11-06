import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import AllPost from "./AllPost";

import Pagination from "./Pagination";
import Carts from "./Carts";
import WorkerProfile from "./WorkerProfile";
import Styles from "./Styles.module.css";

export default function AllWorkers() {
  const [allJob, setAllJob] = useState([]);
  const [profile, setProfile] = useState("");
  const [aplicant, setaplicant] = useState([]);
  const [buttons, setButtons] = useState(false);
  const [Id, setId] = useState("");

  const showButton = () => {
    setButtons(true);
  };
  const hideButton = () => {
    setButtons(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [aplicantPerPage] = useState(3);

  const indexOfLastPost = currentPage * aplicantPerPage;
  const indexOfFirstPost = indexOfLastPost - aplicantPerPage;
  const currentAplicant = aplicant.slice(indexOfFirstPost, indexOfLastPost);

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
    } else {
      console.log("there is no data ");
    }
  };

  const getPosts = (allAplication, id) => {
    const data = allAplication;
    setaplicant(data);
    setProfile([]);
    setId(id);
  };
  const allPosts = async () => {
    const data = await fetch("http://localhost:4006/post/singelPost/" + Id, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const allPost = await data.json();
    if (allPost) {
      setaplicant(allPost.allAplication);
    } else {
      console.log("there is no data ");
    }
  };

  return (
    <>
      <Row className={`${Styles.company}`}>
        <Col xs={12} sm={12} md={5} lg={5} className="mt-1">
          <AllPost
            getPosts={getPosts}
            allJob={allJob}
            hideButton={hideButton}
          />
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
              boxShadow: "0px 5px 5px  0px rgb(148, 148, 148)",
            }}
          >
            <Row>
              <Carts
                currentAplicant={currentAplicant}
                setProfile={setProfile}
                showButton={showButton}
              />
              <Col xs={12} sm={12} md={12} lg={12} className="mt-1 ">
                <Pagination
                  aplicantPerPage={aplicantPerPage}
                  totalAplicant={aplicant.length}
                  paginate={paginate}
                />
              </Col>
            </Row>
          </Col>

          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={`${Styles.dropDown123}`}
          >
            <WorkerProfile
              profile={profile}
              id={Id}
              allPost={allPost}
              allPosts={allPosts}
            />
          </Col>
        </Col>
      </Row>
    </>
  );
}
