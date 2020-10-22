import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import FullProfile from "../components/Profile/FullProfile";
import ProfileSextion from "../components/Profile/ProfileSection";
import Styles from "../components/Profile/Styles.module.css";

export default class Profile extends Component {
  render() {
    return (
      <>
        <Row className={`${Styles.profile}`}>
          <Col xs={12} sm={12} md={4} lg={4}>
            <ProfileSextion />
          </Col>

          <Col xs={12} sm={12} md={8} lg={8}>
            <FullProfile />
          </Col>
        </Row>
      </>
    );
  }
}
