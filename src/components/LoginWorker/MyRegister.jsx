import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Styles from "./Login.module.css";
import {
  Form,
  Col,
  Button,
  InputGroup,
  Row,
  Container,
  FormControl,
  Alert,
} from "react-bootstrap";
import { BiImageAdd } from "react-icons/bi";
import Upload from "./uplad.png";
const mapStateToProps = (state) => state;
function MyRegister(props) {
  const url = process.env.REACT_APP_URL;
  const [registerWorker, setregisterWorker] = useState(
    props.registerWorker.registerWorker === "worker" ? true : false
  );
  const [registerCompany, setregisterCompany] = useState(
    props.registerWorker.registerWorker === "company" ? true : false
  );
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [alert, setAlert] = useState(false);
  const [image, setImage] = useState("");
  const workerData = {
    name,
    username,
    surname,
    position,
    aboutMe,
    email,
    password,
    location,
  };

  const companyData = {
    companyName,
    aboutMe,
    location,
    email,
    password,
  };

  const workerRegister = async () => {
    const register = await fetch(url + "profile/register", {
      method: "POST",
      body: JSON.stringify(workerData),
      // credentials: 'include',
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const uploadPhoto = await (url + "profile/workerImage",
    {
      method: "POST",
      body: JSON.stringify(image),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (register.ok) {
      if (uploadPhoto.ok) {
        setAlert(false);
      }
    } else {
      setAlert(true);
    }
  };

  const companyRegister = async () => {
    const register = await fetch(url + "login/register", {
      method: "POST",
      body: JSON.stringify(companyData),
      // credentials: 'include',
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const uploadPhoto = await (url + "login/companyImage",
    {
      method: "POST",
      body: JSON.stringify(image),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    if (register.ok) {
      if (uploadPhoto.ok) {
        props.login();
        setAlert(false);
      }
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      <Container>
        {alert && (
          <Alert variant="danger" className={`${Styles.input}`}>
            Please Fill All the fields Correctly
          </Alert>
        )}
        {registerWorker && (
          <Form>
            <Form.Row className={`${Styles.form}`}>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  aria-required="true"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  aria-required="true"
                  value={surname}
                  onChange={(e) => setSurname(e.currentTarget.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Username"
                  aria-required="true"
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className={`${Styles.form}`}>
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  aria-required="true"
                  value={location}
                  onChange={(e) => setLocation(e.currentTarget.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Your Main Skill</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Skill"
                  aria-required="true"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    aria-required="true"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Your Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="City"
                  aria-required="true"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </Form.Group>
              <InputGroup as={Col} md="6">
                <InputGroup.Prepend>
                  <InputGroup.Text>About Me</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  aria-required="true"
                  value={aboutMe}
                  placeholder="Say some words about you and your skills"
                  onChange={(e) => setAboutMe(e.currentTarget.value)}
                />
              </InputGroup>
            </Form.Row>
            <Form className={`${Styles.form}`}>
              <Form.Group>
                <Form>
                  {" "}
                  <InputGroup className={`${Styles.uploads}`}>
                    <InputGroup.Prepend>
                      <div className={`${Styles.imageupload}`}>
                        <h6> Upload Your Profile Image</h6>
                        <label for="file-input" aria-required="true">
                          <img src={Upload} />
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          value={image}
                          onChange={(e) => setImage(e.currentTarget.value)}
                        />
                      </div>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form>
              </Form.Group>
            </Form>
            <div className={`${Styles.form}`}>
              <Button
                variant="success"
                onClick={() => {
                  workerRegister();
                }}
              >
                Register
              </Button>
            </div>
          </Form>
        )}

        {registerCompany && (
          <Form>
            <Form.Row className={`${Styles.form}`}>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label> Company Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.currentTarget.value)}
                  aria-required="true"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  aria-required="true"
                  value={location}
                  onChange={(e) => setLocation(e.currentTarget.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row className={`${Styles.form}`}>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    aria-required="true"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Your Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="City"
                  aria-required="true"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </Form.Group>
              <InputGroup as={Col} md="6">
                <InputGroup.Prepend>
                  <InputGroup.Text>About Company</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  aria-required="true"
                  value={aboutMe}
                  placeholder="Short Description  About the Company What is and What is searching for"
                  onChange={(e) => setAboutMe(e.currentTarget.value)}
                />
              </InputGroup>
            </Form.Row>
            <Form className={`${Styles.form}`}>
              <Form.Group>
                <Form>
                  {" "}
                  <InputGroup className={`${Styles.uploads}`}>
                    <InputGroup.Prepend>
                      <div className={`${Styles.imageupload}`}>
                        <h6> Upload Your Profile Image</h6>
                        <label for="file-input" aria-required="true">
                          <img src={Upload} />
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          value={image}
                          onChange={(e) => setImage(e.currentTarget.value)}
                        />
                      </div>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form>
              </Form.Group>
            </Form>
            <div className={`${Styles.form}`}>
              <Button
                variant="success"
                onClick={() => {
                  companyRegister();
                  props.login();
                }}
              >
                Register
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
}

export default connect(mapStateToProps)(MyRegister);
