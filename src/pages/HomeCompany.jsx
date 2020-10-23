import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AllPost from "../components/CompanyHomepage/AllWorkers";

export default function HomeCompany() {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <AllPost />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            hello
          </Col>
        </Row>
      </Container>
    </>
  );
}
