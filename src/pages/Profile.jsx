import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import FullProfile from "../components/Profile/FullProfile";
import ProfileSextion from "../components/Profile/ProfileSection";
import Styles from "../components/Profile/Styles.module.css";

export default class Profile extends Component {
  render() {
    return (
      <>
        <Row className="m-0 p-0">
          <Col xs={12} sm={12} md={12} lg={12}>
            <ProfileSextion />
          </Col>

          <Col xs={12} sm={12} md={12} lg={12}>
            <FullProfile />
          </Col>
        </Row>
      </>
    );
  }
}
