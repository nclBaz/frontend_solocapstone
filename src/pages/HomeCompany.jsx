import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Styles from "../components/CompanyHomepage/Styles.module.css";
import AllPost from "../components/CompanyHomepage/AllWorkers";

export default function HomeCompany() {
  return (
    <>
      <Row className={`${Styles.company}`}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <AllPost />
        </Col>
      </Row>
    </>
  );
}
