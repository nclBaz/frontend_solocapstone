import React, { useEffect, useState } from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdWeb } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import About from "./About";
import Style from "./Styles.module.css";

import Styles from "./Styles.module.css";
export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [hideProfile, setHideProfile] = useState(true);
  const [hideEdit, setHideEdit] = useState(false);
  const [hideIcon, setHideIcon] = useState(true);
  const [companyName, setName] = useState("");
  const [location, setlocation] = useState("");
  const [website, setwebsite] = useState("");
  const [personel, setpersonel] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const result = await fetch(url + "/login/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const data = await result.json();
      setProfile(data);
      setName(data[0].companyName);
      setlocation(data[0].location);
      setwebsite(data[0].website);
      setpersonel(data[0].personel);
      setEmail(data[0].email);
      setAbout(data[0].aboutMe);
    }
  };
  const editProfile = async () => {
    const result = await fetch(url + "/login/edit", {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ companyName, location, personel, website, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      fetchProfile();
      showEdit();
    }
  };
  console.log(profile);

  const hideData = async () => {
    if (hideProfile === true) {
      setHideProfile(false);
      setHideEdit(true);
      setHideIcon(false);
    }
  };
  const showEdit = async () => {
    if (hideProfile === false) {
      setHideProfile(true);
      setHideEdit(false);
      setHideIcon(true);
    }
  };
  const handleUpload = async (e) => {
    const uploadImage = e.target.files[0];
    const image = new FormData();
    image.append("image", uploadImage);
    const uploadPhoto = await fetch(url + "/login/uploadImage", {
      method: "POST",
      body: image,
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (uploadPhoto.ok) {
      fetchProfile();
    } else {
      console.log("uploadd photo is not working");
    }
  };

  return (
    <Row className="m-0 p-0">
      {profile &&
        profile.map((data) => {
          return (
            <>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={`${Styles.profile} mt-4`}
              >
                <div
                  className={`${Styles.header} `}
                  style={{ height: "200px" }}
                >
                  <div
                    className="mt-3 ml-5 "
                    style={{ height: "150px", display: "flex" }}
                  >
                    {data.image ? (
                      <>
                        <img
                          src={data.image}
                          className={`${Styles.imgProfile}`}
                        />

                        <label
                          htmlFor="file-input"
                          aria-required="true"
                          className={`${Style.uploadPhoto}`}
                        >
                          <AiOutlineEdit className={`${Style.icon}`} />
                        </label>
                        <input
                          className={`${Style.input}`}
                          key="image"
                          id="file-input"
                          type="file"
                          accept="image/*"
                          profile="file"
                          onChange={(e) => handleUpload(e)}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className={`${Style.imgProfile}`}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9-Tom5eAUi7AaarN_g-WIkVxvRNhdHa8BrQ&usqp=CAU"
                        />

                        <label
                          htmlFor="file-input"
                          aria-required="true"
                          className={`${Style.uploadPhoto}`}
                        >
                          <AiOutlineEdit className={`${Style.icon}`} />
                        </label>
                        <input
                          className={`${Style.input}`}
                          key="image"
                          id="file-input"
                          type="file"
                          accept="image/*"
                          profile="file"
                          // value={this.state.image}
                          onChange={(e) => handleUpload(e)}
                        />
                        {/* </div> */}
                      </>
                    )}
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <div className={`${Styles.div}`}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={4}>
                      {hideProfile && (
                        <>
                          <div className={`${Style.dataInfo} mt-1`}>
                            <div>
                              <h5 className="mt-4">Personal Info</h5>
                              {hideIcon && (
                                <AiOutlineEdit
                                  onClick={hideData}
                                  className="mt-1"
                                  style={{
                                    marginLeft: "auto",
                                    fontSize: "25px",
                                    color: "orangered",
                                  }}
                                />
                              )}
                            </div>
                            <div>
                              <FaUserAlt />

                              {data.companyName ? (
                                <h6>{data.companyName}</h6>
                              ) : (
                                <h6>Company Name Empty</h6>
                              )}
                            </div>
                            <div>
                              <AiOutlineMail />

                              {data.email ? (
                                <h6>{data.email}</h6>
                              ) : (
                                <h6>Email Empty</h6>
                              )}
                            </div>
                            <div>
                              <GoLocation />
                              {data.location ? (
                                <h6>{data.location}</h6>
                              ) : (
                                <h6>No Location</h6>
                              )}
                            </div>
                            <div>
                              <MdWeb />
                              {data.website ? (
                                <h6>{data.website}</h6>
                              ) : (
                                <h6>No Website</h6>
                              )}
                            </div>
                            <div className="mb-2">
                              <GrUserWorker />

                              {data.personel ? (
                                <h6>{data.personel} Hired</h6>
                              ) : (
                                <h6>No Info</h6>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      {hideEdit && (
                        <>
                          <div className={`${Style.dataInfo}`}>
                            <div>
                              <h5 className="mt-2">Edit Info</h5>
                            </div>

                            <div>
                              <FaUserAlt />

                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "80%",
                                  marginLeft: "10px",
                                }}
                                value={companyName}
                                onChange={(e) => setName(e.currentTarget.value)}
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>
                            <div>
                              <AiOutlineMail />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "80%",
                                  marginLeft: "10px",
                                }}
                                aria-label="Small"
                                value={email}
                                onChange={(e) =>
                                  setEmail(e.currentTarget.value)
                                }
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>
                            <div>
                              <GoLocation />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "80%",
                                  marginLeft: "10px",
                                }}
                                value={location}
                                onChange={(e) =>
                                  setlocation(e.currentTarget.value)
                                }
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>
                            <div>
                              <MdWeb />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "80%",
                                  marginLeft: "10px",
                                }}
                                value={website}
                                onChange={(e) =>
                                  setwebsite(e.currentTarget.value)
                                }
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>
                            <div>
                              <GrUserWorker />
                              <FormControl
                                style={{
                                  height: "20px",
                                  width: "80%",
                                  marginLeft: "10px",
                                }}
                                value={personel}
                                onChange={(e) =>
                                  setpersonel(e.currentTarget.value)
                                }
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                              />
                            </div>
                            <div>
                              <Button
                                style={{ marginLeft: "auto" }}
                                variant="light"
                                className={`${Style.btngrad} mr-2`}
                                onClick={() => editProfile()}
                              >
                                Save
                              </Button>
                              <Button
                                variant="light"
                                className={`${Style.btngrad}`}
                                onClick={showEdit}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={8}>
                      <div className={`${Style.dataAbout} m-0 p-0`}>
                        <About />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </>
          );
        })}
    </Row>
  );
}
