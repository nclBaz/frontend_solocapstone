import React from "react";
import Profile from "../components/ProfileCompany/Profile";
import { Row, Col } from "react-bootstrap";

export default function ProfileCompany() {
  return (
    <>
      <Row className="p-0 m-0">
        <Col xs={12} sm={12} md={12} lg={12}>
          <Profile />
        </Col>
      </Row>
    </>
  );
}
