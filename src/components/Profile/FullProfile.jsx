import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Styles from "./Styles.module.css";
import About from "./About";
import WorkExperience from "./Workexperience";
import Education from "./Education";
import Skills from "./Skills";

export default function FullProfile() {
  return (
    <Container>
      <Row className={`${Styles.fullProfile}`}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <About />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <WorkExperience />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Education />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Skills />
        </Col>
      </Row>
    </Container>
  );
}
