import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "./Logo.png";
import Styles from "./Navbar.module.css";

import { withRouter, Link } from "react-router-dom";

function Headers(props) {
  const url = process.env.REACT_APP_URL;

  const userLogout = async () => {
    const result = await fetch(url + "profile/logout", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    });
    if (result.ok) {
      props.UserProfile();
      props.history.push("/");
      props.logOut();
    } else {
      console.log("Not working");
    }
  };

  const companyLogout = async () => {
    const result = await fetch(url + "login/logout", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(),

      headers: { "Content-Type": "application/json" },
    });
    if (result.ok) {
      props.CompanyProfile();
      props.history.push("/");
      props.logOut();
    } else {
      console.log("Not working");
    }
  };
  useEffect(() => {
    props.UserProfile();
    props.CompanyProfile();
  }, [props.userNavBar, props.companyNavBar]);

  return (
    <Navbar variant="dark" className={`${Styles.bar} `} expand="lg">
      <Navbar.Brand>
        <img src={Logo} style={{ width: "80px", height: "40px" }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {props.userNavBar && (
          <Nav className={`${Styles.navBar} , ml-auto`}>
            <Nav>
              <Link
                to="/worker"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                className="ml-2"
              >
                Home
              </Link>
            </Nav>
            <Nav>
              <Link
                to="/aplication"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                className="ml-2"
              >
                Aplication
              </Link>
            </Nav>
            <Nav>
              <Link
                to="/workerProfile"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                className="ml-2"
              >
                Profile
              </Link>
            </Nav>
            <Nav
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              className="ml-2"
              onClick={() => userLogout()}
            >
              Logout
            </Nav>
          </Nav>
        )}
        {props.companyNavBar && (
          <Nav className={`${Styles.navBar} , ml-auto`}>
            <Nav>
              <Link
                to="/company"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                className="ml-2"
              >
                Home
              </Link>
            </Nav>
            <Nav>
              <Link
                to="/companyPosts"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                className="ml-2"
              >
                Posts
              </Link>
            </Nav>
            <Nav>
              <Link
                to="/companyProfile"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                className="ml-2"
              >
                Profile
              </Link>
            </Nav>
            <Nav
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              className="ml-2"
              onClick={() => companyLogout()}
            >
              Logout
            </Nav>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(Headers);
