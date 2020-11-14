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
import Logo from "./Logo.png";
import { BiImageAdd } from "react-icons/bi";
import Upload from "./uplad.png";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
  const [portfolioLink, setportfolioLink] = useState("");
  const [position, setPosition] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [website, setwebsite] = useState("");
  const [personel, setpersonel] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [alert, setAlert] = useState(false);
  const [image, setImage] = useState("");
  const workerData = {
    name,
    surname,
    position,
    aboutMe,
    email,
    password,
    location,
    dateOfBirth,
  };

  const companyData = {
    companyName,
    aboutMe,
    location,
    email,
    password,
    website,
    personel,
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
      <Row
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "1%",
        }}
      >
        {alert && (
          <Alert variant="danger" className={`${Styles.input}`}>
            Please Fill All the fields Correctly
          </Alert>
        )}
        {registerWorker && (
          <>
            <Col xs={12} sm={12} md={5} lg={5} className="mt-5">
              <div className={`${Styles.title}`}>
                <img src={Logo} style={{ width: "70%" }} />
                <h6>Find your future job in TECH JOBS</h6>
              </div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7}>
              <div
                style={{
                  height: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="mt-1 mb-4"
              >
                <form
                  className={`${Styles.form1} `}
                  noValidate
                  autoComplete="off"
                >
                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="First name"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Password"
                      type="password"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={surname}
                      onChange={(e) => setSurname(e.currentTarget.value)}
                    />
                  </div>
                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="Position"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Portfolio Link"
                      type="password"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={portfolioLink}
                      onChange={(e) => setportfolioLink(e.currentTarget.value)}
                    />
                  </div>
                  <div className="mt-2 mb-4">
                    <TextField
                      id="filled-multiline-flexible"
                      label="Location"
                      type="password"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "95%",
                      }}
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.currentTarget.value)}
                    />
                  </div>
                  <div className="mt-2 mb-4">
                    <TextField
                      id="filled-multiline-flexible"
                      label="Birthday Date"
                      type="password"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "95%",
                      }}
                      type="text"
                      value={dateOfBirth}
                      onChange={(e) => setdateOfBirth(e.currentTarget.value)}
                    />
                  </div>
                  <div
                    className="mt-2 mb-4"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="filled-multiline-flexible"
                      label="Email"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <TextField
                      id="filled-multiline-flexible"
                      label="Password"
                      type="password"
                      defaultValue="Hello World"
                      variant="outlined"
                      style={{
                        width: "45%",
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </div>
                  <div className="mt-2 mb-4">
                    {" "}
                    <TextField
                      id="outlined-multiline-static"
                      label="About Me"
                      multiline
                      rows={4}
                      style={{
                        width: "95%",
                      }}
                      variant="outlined"
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.currentTarget.value)}
                    />
                  </div>
                  <div className="mt-2 mb-4">
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
                  </div>
                  <div className={`${Styles.form}`}>
                    <Button
                      variant="success"
                      onClick={() => {
                        workerRegister();
                      }}
                    >
                      Register
                    </Button>
                    <br></br>
                    <br></br>
                    <Button
                      variant="light"
                      className={`${Styles.btngrad} mb-2`}
                      onClick={() => props.register()}
                    >
                      Back
                    </Button>{" "}
                  </div>
                </form>{" "}
              </div>
            </Col>
          </>
          // <Form>
          //   <Form.Row className={`${Styles.form}`}>
          //     <Form.Group as={Col} md="4" controlId="validationCustom01">
          //       <Form.Label>First name</Form.Label>
          //       <Form.Control
          //         required
          //         type="text"
          //         placeholder="First name"
          //         value={name}
          //         onChange={(e) => setName(e.currentTarget.value)}
          //         aria-required="true"
          //       />
          //       <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          //     </Form.Group>
          //     <Form.Group as={Col} md="4" controlId="validationCustom02">
          //       <Form.Label>Last name</Form.Label>
          //       <Form.Control
          //         required
          //         type="text"
          //         placeholder="Last name"
          //         aria-required="true"
          //         value={surname}
          //         onChange={(e) => setSurname(e.currentTarget.value)}
          //       />
          //       <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          //     </Form.Group>
          //     <Form.Group as={Col} md="4" controlId="validationCustom03">
          //       <Form.Label>Username</Form.Label>
          //       <Form.Control
          //         type="email"
          //         placeholder="Username"
          //         aria-required="true"
          //         value={username}
          //         onChange={(e) => setUsername(e.currentTarget.value)}
          //       />
          //     </Form.Group>
          //   </Form.Row>
          //   <Form.Row className={`${Styles.form}`}>
          //     <Form.Group as={Col} md="5" controlId="validationCustom03">
          //       <Form.Label>Location</Form.Label>
          //       <Form.Control
          //         type="text"
          //         placeholder="Location"
          //         aria-required="true"
          //         value={location}
          //         onChange={(e) => setLocation(e.currentTarget.value)}
          //       />
          //       <Form.Control.Feedback type="invalid">
          //         Please provide a valid city.
          //       </Form.Control.Feedback>
          //     </Form.Group>
          //     <Form.Group as={Col} md="5" controlId="validationCustom03">
          //       <Form.Label>Your Main Skill</Form.Label>
          //       <Form.Control
          //         type="text"
          //         placeholder="Your Skill"
          //         aria-required="true"
          //         required
          //         value={position}
          //         onChange={(e) => setPosition(e.currentTarget.value)}
          //       />
          //     </Form.Group>
          //     <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          //       <Form.Label>Email</Form.Label>
          //       <InputGroup>
          //         <InputGroup.Prepend>
          //           <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          //         </InputGroup.Prepend>
          //         <Form.Control
          //           type="text"
          //           placeholder="Username"
          //           aria-describedby="inputGroupPrepend"
          //           aria-required="true"
          //           required
          //           value={email}
          //           onChange={(e) => setEmail(e.currentTarget.value)}
          //         />
          //       </InputGroup>
          //     </Form.Group>
          //     <Form.Group as={Col} md="4" controlId="validationCustom03">
          //       <Form.Label>Your Password</Form.Label>
          //       <Form.Control
          //         type="password"
          //         placeholder="City"
          //         aria-required="true"
          //         value={password}
          //         onChange={(e) => setPassword(e.currentTarget.value)}
          //       />
          //     </Form.Group>
          //     <InputGroup as={Col} md="6">
          //       <InputGroup.Prepend>
          //         <InputGroup.Text>About Me</InputGroup.Text>
          //       </InputGroup.Prepend>
          //       <FormControl
          //         as="textarea"
          //         aria-label="With textarea"
          //         aria-required="true"
          //         value={aboutMe}
          //         placeholder="Say some words about you and your skills"
          //         onChange={(e) => setAboutMe(e.currentTarget.value)}
          //       />
          //     </InputGroup>
          //   </Form.Row>
          //   <Form className={`${Styles.form}`}>
          //     <Form.Group>
          //       <Form>
          //         {" "}
          //         <InputGroup className={`${Styles.uploads}`}>
          //           <InputGroup.Prepend>
          //             <div className={`${Styles.imageupload}`}>
          //               <h6> Upload Your Profile Image</h6>
          //               <label for="file-input" aria-required="true">
          //                 <img src={Upload} />
          //               </label>
          //               <input
          //                 id="file-input"
          //                 type="file"
          //                 value={image}
          //                 onChange={(e) => setImage(e.currentTarget.value)}
          //               />
          //             </div>
          //           </InputGroup.Prepend>
          //         </InputGroup>
          //       </Form>
          //     </Form.Group>
          //   </Form>
          //   <div className={`${Styles.form}`}>
          //     <Button
          //       variant="success"
          //       onClick={() => {
          //         workerRegister();
          //       }}
          //     >
          //       Register
          //     </Button>
          //   </div>
          // </Form>
        )}

        {registerCompany && (
          <Form className="mt-2 mb-2">
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
      </Row>
    </>
  );
}

export default connect(mapStateToProps)(MyRegister);
