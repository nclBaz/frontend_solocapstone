import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Col, Button, InputGroup, Row, Alert } from "react-bootstrap";

import Styles from "./Login.module.css";
const mapStateToProps = (state) => state;
function MyLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginWorker, setLoginWorker] = useState(
    props.registerWorker.registerWorker === "worker" ? true : false
  );
  const [loginCompany, setLoginCompany] = useState(
    props.registerWorker.registerWorker === "company" ? true : false
  );
  const [alert, setAlert] = useState(false);

  // const url = process.env.URL
  // console.log(url)
  const showLogin = props.registerWorker;
  console.log(props.fechWorkers);
  console.log(props.registerWorker.registerWorker, "registered worker");
  console.log(showLogin, "value");
  
  const worker = async () => {
    const moreData = await fetch("http://localhost:4006/profile/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credential: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (moreData.ok) {
      props.history.push("/worker");
      console.log("loged in as company");

      setAlert(false);
    } else {
      setAlert(true);
    }
  };

  const company = async () => {
    const result = await fetch("http://localhost:4006/login/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credential: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (result.ok) {
      console.log("tou are loged in as user");
      setAlert(false);
      props.history.push("/company");
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      {console.log(loginWorker)}
      {console.log(loginCompany)}
      <div>
        {alert && (
          <Alert variant="danger" className={`${Styles.input}`}>
            Check again Your Login credentials
          </Alert>
        )}
        {loginWorker && (
          <Form className={`${Styles.form}`}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className={`${Styles.input}`}
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={`${Styles.input}`}
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => worker()}>
              <Link to="/home" style={{ textDecoration: "none" }}>
                {" "}
                Login
              </Link>
            </Button>
            <br></br>
            <br></br>
            You are new .... ?{" "}
            <Button variant="success" onClick={() => props.register()}>
              Register here
            </Button>
          </Form>
        )}
        {loginCompany && (
          <Form className={`${Styles.form}`}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className={`${Styles.input}`}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={`${Styles.input}`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => company()}>
              Login
            </Button>
            <br></br>
            <br></br>
            You are new .... ?{" "}
            <Button variant="success" onClick={() => props.register()}>
              Register here
            </Button>
          </Form>
        )}
      </div>
    </>
  );
}

export default withRouter(connect(mapStateToProps)(MyLogin));
