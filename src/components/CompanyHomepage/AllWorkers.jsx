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
  const [singleJob, setSingelJob] = useState([]);
  const [profile, setProfile] = useState([]);
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
      setSingelJob(allPost[0]);
      console.log("fetch is ok");
      console.log(allPost);
    } else {
      console.log("there is no data ");
    }
  };

  const fetchWorker = async (id) => {
    const result = await fetch(
      "http://localhost:4006/login/singleProfile/" + id,
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
      setProfile(data);
    } else {
      console.log("no data");
    }
  };

  const getPosts = (allAplication) => {
    const data = allAplication;
    setaplicant(data);
    setProfile([]);
    about();
  };

  const about = (e) => {
    setBasicData(true);
    setEducation(false);
    setWorkExperience(false);
    setSkills(false);
  };

  const educationData = () => {
    setBasicData(false);
    setEducation(true);
    setWorkExperience(false);
    setSkills(false);
  };
  const workData = () => {
    setBasicData(false);
    setEducation(false);
    setWorkExperience(true);
    setSkills(false);
  };
  const skillsData = () => {
    setBasicData(false);
    setEducation(false);
    setWorkExperience(false);
    setSkills(true);
  };

  const getPDF = async (id) => {
    const result = await fetch(`http://localhost:4006/login/${id}/pdf`, {
      method: "GET",
      credentials: "include",
    });
    if (result.ok) {
      console.log("u shakarkua");
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
              height: "200px",
              borderBottom: "2px solid grey",
            }}
          >
            <Row>
              <Carts
                currentAplicant={currentAplicant}
                about={about}
                fetchWorker={fetchWorker}
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
          {buttons && (
            <>
              <Col xs={12} sm={12} md={12} lg={12} className="mt-1">
                <Button
                  className={`mr-1 ${Styles.btngrad}`}
                  onClick={(e) => about(e)}
                >
                  Profile
                </Button>
                <Button
                  className={`mr-1 ${Styles.btngrad}`}
                  onClick={() => educationData()}
                >
                  Education
                </Button>
                <Button
                  className={`mr-1 ${Styles.btngrad}`}
                  onClick={() => workData()}
                >
                  Work Experience
                </Button>
                <Button
                  className={`mr-1 ${Styles.btngrad}`}
                  onClick={() => skillsData()}
                >
                  Skills
                </Button>

                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={`${Styles.dropDown123}`}
                >
                  <WorkerProfile
                    profile={profile}
                    basicData={basicData}
                    education={education}
                    workExperience={workExperience}
                    skills={skills}
                  />
                </Col>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Button className={`mr-1  ml-3  ${Styles.btngrad}`}>
                  Get PDF
                </Button>
                <Button
                  className={` mr-1 ${Styles.btngrad}`}
                  onClick={handleShow}
                >
                  Send Email
                </Button>
                <Button className={` mr-1 ${Styles.btngrad}`}>Accept</Button>
                <Button className={` mr-1 ${Styles.btngrad}`}>Remove</Button>
              </Col>
            </>
          )}
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
