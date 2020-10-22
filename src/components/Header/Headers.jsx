import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "./Logo.png";
import Styles from "./Navbar.module.css";

import { withRouter, Link } from "react-router-dom";

class Headers extends Component {
  render() {
    return (
      <Navbar variant="dark" className={`${Styles.bar} w-100`} expand="lg">
        <Navbar.Brand>
          <img src={Logo} style={{ width: "80px", height: "40px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${Styles.navBar} , ml-auto`}>
            <Nav.Link>
              <Link
                to="/worker"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to="/workerProfile"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Profile
              </Link>
            </Nav.Link>
            <Nav.Link
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Headers);
