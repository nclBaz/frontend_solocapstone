import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import AllPost from "./AllPost";
import Modal from "./SendEmail";
import Pagination from "./Pagination";
import Carts from "./Carts";
import WorkerProfile from "./WorkerProfile";
import Styles from "./Styles.module.css";

export default function AllWorkers() {
  const [allJob, setAllJob] = useState([]);
  const [profile, setProfile] = useState("");
  const [aplicant, setaplicant] = useState([]);
  const [basicData, setBasicData] = useState(true);
  const [education, setEducation] = useState(false);
  const [workExperience, setWorkExperience] = useState(false);
  const [skills, setSkills] = useState(false);
  const [buttons, setButtons] = useState(false);

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

  const getPosts = (allAplication) => {
    const data = allAplication;
    setaplicant(data);
    setProfile([]);
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
              boxShadow: "7px 7px 7px rgb(148, 148, 148)",
            }}
          >
            <Row>
              <Carts
                currentAplicant={currentAplicant}
                setProfile={setProfile}
                showButton={showButton}
              />
              <Col xs={12} sm={12} md={12} lg={12} className="mt-0 ">
                <Pagination
                  aplicantPerPage={aplicantPerPage}
                  totalAplicant={aplicant.length}
                  paginate={paginate}
                />
              </Col>
            </Row>
          </Col>
          {/* {/* {buttons && (
            <> */}
          {/* <Col xs={12} sm={12} md={12} lg={12} className="mt-1 text-right"> */}
          {/* <Button
                  className={`mr-1 ${Styles.btngrad}`}
                  onClick={(e) => about(e)}
                  style={{ fontSize: "11px" }}
                >
                  Profile
                </Button>
                <Button
                  className={`mr-1 ${Styles.btngrad}`}
                  onClick={() => educationData()}
                  style={{ fontSize: "11px" }}
                >
                  Education
                </Button>
                <Button
                  className={`mr-1 ${Styles.btngrad}`}
                  onClick={() => workData()}
                  style={{ fontSize: "11px" }}
                >
                  Work Experience
                </Button>
                <Button
                  className={`mr-1 ${Styles.btngrad}`}
                  onClick={() => skillsData()}
                  style={{ fontSize: "11px" }}
                >
                  Skills
                </Button> */}

          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={`${Styles.dropDown123}`}
          >
            <WorkerProfile profile={profile} />
          </Col>
        </Col>
      </Row>
      <Modal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        _id={profile[0] && profile[0]._id}
        email={profile[0] && profile[0].email}
      />
    </>
  );
}
