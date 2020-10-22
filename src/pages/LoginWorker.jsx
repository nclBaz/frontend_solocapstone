import React from "react";
import { useState, useEffect } from "react";
import { Form, Col, Button, InputGroup, Row, Container } from "react-bootstrap";
import Styles from "../components/LoginWorker/Login.module.css";
import Buttons from "../components/LoginWorker/Buttons";
import MyLogin from "../components/LoginWorker/MyLogin";
import MyRegister from "../components/LoginWorker/MyRegister";

export default function LoginWorker() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [hideButtons, setHideButtons] = useState(true);

  const sendTo = () => {
    setShowLogin(!showLogin);
    // setShowRegister(!showRegister)
    setHideButtons(!hideButtons);
  };
  const Register = () => {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  };

  const Login = () => {
    setShowRegister(!showRegister);
    setShowLogin(!showLogin);
  };
  return (
    <>
      <Container>
        <div className={`${Styles.title}`}>
          <h3 style={{ marginTop: "70px" }}> Welcome to TECH JOBS </h3>
          <h6>Find your future job in TECH JOBS</h6>
        </div>

        {hideButtons && <Buttons sendTo={() => sendTo()} />}

        {showLogin && <MyLogin register={() => Register()} />}

        {showRegister && <MyRegister login={() => Login()} />}
      </Container>
    </>
  );
}
