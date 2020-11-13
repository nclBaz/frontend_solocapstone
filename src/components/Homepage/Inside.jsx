import React, { Component } from "react";
import { Row, Col, Tab, Tabs, Button, Modal } from "react-bootstrap";
import Styles from "./Styles.module.css";
import { MdWork } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { HiOfficeBuilding } from "react-icons/hi";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";

import { TiLocation } from "react-icons/ti";
import { connect } from "react-redux";
const mapStateToProps = (state) => state;
const url = process.env.REACT_APP_URL;
class Inside extends Component {
  state = {
    allPost: [],
    comp: [],
    companie: [],
    companies: false,
    showModal: false,
    projetc: 0,
    filter: [],
    title: "",
    aplication: [],
    allJobPost: [],
    showButton: true,
    hideButton: false,
    myProfile: {},
  };

  componentDidMount = async () => {
    const response = await fetch(url + "profile/allCompanies", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const fetchedUsers = await response.json();
    console.log(fetchedUsers, "users");
    this.setState({ comp: fetchedUsers });
    this.setState({ companie: fetchedUsers[0] });

    const result = await fetch(url + `profile/allPostJobs`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    console.log(this.state.title, "titttttle");
    const fetchedPost = await result.json();
    this.setState({ allPost: fetchedPost });
    this.setState({ allJobPost: fetchedPost });
    this.setState({ filter: fetchedPost[0] });
    console.log(this.state.project);

    this.fetchProfile();
  };

  fetchProfile = async () => {
    const result = await fetch(url + "profile/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const data = await result.json();
      this.setState({ myProfile: data });
      console.log(data);
    }
  };

  showCompanies = (e) => {
    const userId = e.userID;
    const postId = e._id;

    const findCompani = this.state.comp.find((x) => x._id === userId);
    const findPost = this.state.allPost.find((x) => x._id === postId);
    console.log(findPost, "this is the post");
    console.log(findCompani, "thisis company");
    this.setState({ filter: findPost });
    this.setState({ companie: findCompani });
    this.checkAply(userId, postId);
  };

  filterPost = (e) => {
    console.log(e);
    const text = e;
    if (text) {
      const filterPost = this.state.allPost.filter((x) =>
        x.jobPosition.toLowerCase().includes(text.toLowerCase())
      );
      if (filterPost) {
        this.setState({ allPost: filterPost });
      }
    } else {
      this.setState({ allPost: this.state.allJobPost });
    }
  };

  toogle = () => {
    if (this.state.companies === false) {
      this.setState({ companies: true });
    } else {
      this.setState({ companies: false });
    }
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  checkAply = (userId, postId) => {
    if (
      this.props.allAplication.allAplication &&
      this.props.allAplication.allAplication.find(
        (x) => x.postId._id === postId
      )
    ) {
      this.setState({ hideButton: true });
      this.setState({ showButton: false });
      console.log(" u bo , u kry");
    } else {
      this.setState({ hideButton: false });
      this.setState({ showButton: true });
      console.log(
        this.props.allAplication.allAplication &&
          this.props.allAplication.allAplication.userID === userId &&
          this.props.allAplication.allAplication.postId &&
          this.props.allAplication.allAplication.postId.map(
            (x) => x.userID === postId
          ),
        "helllo"
      );
    }
  };
  aplyForJob = async () => {
    const aply = await fetch(url + `aplication/aply/` + this.state.filter._id, {
      method: "POST",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (aply.ok) {
      alert("Your Aplication  Was Ok");
      console.log("u kry me sukses");
    }
  };

  render() {
    return (
      <>
        <Row className={`text-center mt-2 ${Styles.search}`}>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={5}
            className={`${Styles.company} mt-3 `}
          >
            <Row className={`  ${Styles.row1}`}>
              <Col xs={12} sm={12} md={12} lg={12} className="mt-2">
                <div
                  style={{
                    backgroundColor: "white",
                    zIndex: "10",
                    position: "-webkit-sticky",
                    position: "sticky",
                    top: "0",
                    height: "150px",
                  }}
                >
                  <div
                    className={`${Styles.cartblock1} `}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      // height: "80%",
                    }}
                  >
                    {this.state.myProfile && this.state.myProfile.image ? (
                      <img
                        src={this.state.myProfile.image}
                        className={` mt-1 mb-2`}
                        style={{
                          borderRadius: "none !important",
                        }}
                      />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9-Tom5eAUi7AaarN_g-WIkVxvRNhdHa8BrQ&usqp=CAU"
                        className={` mt-1 mb-2`}
                        style={{
                          borderRadius: "none !important",
                        }}
                      />
                    )}
                    <div
                      className="mt-3"
                      style={{
                        height: "auto",
                      }}
                    >
                      <h5>
                        {this.state.myProfile && this.state.myProfile.name}{" "}
                        {this.state.myProfile && this.state.myProfile.surname}
                      </h5>
                      <h6>
                        {this.state.myProfile && this.state.myProfile.position}
                      </h6>
                      <h6>
                        {this.state.myProfile && this.state.myProfile.email}
                      </h6>
                    </div>
                  </div>

                  <input
                    type="text"
                    className={`${Styles.text}`}
                    placeholder="Search by job position"
                    onChange={(e) => this.filterPost(e.currentTarget.value)}
                  />
                </div>

                <div className={`mt-5 ${Styles.about}`}>
                  {this.state.allPost &&
                    this.state.allPost.map((data, i) => (
                      <>
                        <div>
                          <div
                            className={`${Styles.cards} e-card e-card-horizontal mt-2`}
                            onClick={() => this.showCompanies(data)}
                          >
                            {data.image ? (
                              <img
                                className={`${Styles.img} ml-1 mt-1 mb-1`}
                                src={data.image}
                                alt="Sample"
                              />
                            ) : (
                              <img
                                className="ml-1"
                                src="https://www.flaticon.com/svg/static/icons/svg/52/52782.svg"
                                alt="Sample"
                                style={{ height: `145px`, width: `150px` }}
                              />
                            )}
                            <div
                              className="e-card-stacked "
                              style={{ width: "300px", textAlign: "left" }}
                            >
                              <div className="e-card-header mt-2 ml-2">
                                <div className="e-card-header-caption">
                                  <div className="e-card-header-title">
                                    <div style={{ display: "flex" }}>
                                      <HiOfficeBuilding
                                        className={`${Styles.icons}`}
                                      />
                                      <h6>{data.companyName}</h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="e-card-content ml-2">
                                <div style={{ display: "flex" }}>
                                  {" "}
                                  <MdWork className={`${Styles.icons}`} />{" "}
                                  <h5 className="ml-1">{data.jobPosition}</h5>
                                </div>

                                <div style={{ display: "flex" }}>
                                  <TiLocation className={`${Styles.icons}`} />{" "}
                                  <p>{data.location}</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                  <MdAttachMoney
                                    className={`${Styles.icons}`}
                                  />
                                  <p>{data.salary}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={7}
            className={`${Styles.company} mt-3`}
          >
            <Row className={`${Styles.row2}`}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <div>
                  {this.state.filter && (
                    <div key={this.state.filter._id}>
                      <div
                        style={{ display: "flex" }}
                        className={`${Styles.infoCards}`}
                      >
                        <div
                          className="e-card-stacked "
                          style={{ width: "300px", textAlign: "left" }}
                        >
                          <div className="e-card-header mt-2 ml-2">
                            <div className="e-card-header-caption">
                              <div className="e-card-header-title"></div>
                            </div>
                          </div>
                          <div className="e-card-content ml-2">
                            <div style={{ display: "flex" }}>
                              {" "}
                              <MdWork className={`${Styles.icons}`} />{" "}
                              <h5 className="ml-1">
                                {this.state.filter.jobPosition}
                              </h5>
                            </div>

                            <div style={{ display: "flex" }}>
                              <TiLocation className={`${Styles.icons}`} />{" "}
                              <p>{this.state.filter.location}</p>
                            </div>
                            <div style={{ display: "flex" }}>
                              <MdAttachMoney className={`${Styles.icons}`} />
                              <p>{this.state.filter.salary}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            marginLeft: "auto",
                            marginTop: "35px",
                            marginRight: "15px",
                          }}
                        >
                          {this.state.showButton && (
                            <Button
                              type="button"
                              variant="light"
                              onClick={() => {
                                this.showModal();
                              }}
                              className={`${Styles.btngrad}`}
                            >
                              Apply for Job
                            </Button>
                          )}
                          {this.state.hideButton && (
                            <Button
                              type="button"
                              variant="light"
                              className={`${Styles.btngrad}`}
                            >
                              You have applyed
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className={`${Styles.desc}`}>
                        <Tabs
                          defaultActiveKey="company"
                          id="uncontrolled-tab-example"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Tab
                            eventKey="company"
                            title="Company"
                            className="m-0 p-0"
                          >
                            {this.state.companie && (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: 0,
                                    padding: 0,
                                  }}
                                  className={`${Styles.example}`}
                                >
                                  <div
                                    className={` e-card e-card-horizontal mt-4`}
                                    style={{
                                      height: "auto",
                                    }}
                                  >
                                    {this.state.companie.image ? (
                                      <img
                                        className={`${Styles.img}  mt-1 mb-1`}
                                        src={this.state.companie.image}
                                        alt="Sample"
                                      />
                                    ) : (
                                      <img
                                        src="https://www.flaticon.com/svg/static/icons/svg/52/52782.svg"
                                        alt="Sample"
                                        style={{
                                          height: `145px`,
                                          width: `150px`,
                                        }}
                                      />
                                    )}
                                    <div
                                      className="e-card-stacked "
                                      style={{
                                        width: "300px",
                                        // textAlign: "left",
                                      }}
                                    >
                                      <div className="e-card-header mt-2 ml-2">
                                        <div className="e-card-header-caption">
                                          <div className="e-card-header-title">
                                            <div style={{ display: "flex" }}>
                                              <HiOfficeBuilding
                                                className={`${Styles.icons} mr-1`}
                                              />
                                              <h6>
                                                {
                                                  this.state.companie
                                                    .companyName
                                                }
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="e-card-content ml-2">
                                        <div style={{ display: "flex" }}>
                                          {" "}
                                          <CgWebsite
                                            className={`${Styles.icons} mr-1`}
                                          />{" "}
                                          <h6 className="ml-1">
                                            {this.state.companie.website}
                                          </h6>
                                        </div>

                                        <div style={{ display: "flex" }}>
                                          <TiLocation
                                            className={`${Styles.icons} mr-1`}
                                          />{" "}
                                          <h6>
                                            {this.state.companie.location}
                                          </h6>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                          <AiOutlineMail
                                            className={`${Styles.icons} mr-1`}
                                          />{" "}
                                          <h6>{this.state.companie.email}</h6>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                          <GrUserWorker
                                            className={`${Styles.icons} mr-1`}
                                          />
                                          <h6>
                                            {this.state.companie.personel}-Hired
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`${Styles.about} mt-4`}>
                                    {" "}
                                    <p>{this.state.companie.aboutMe}</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </Tab>
                          <Tab
                            eventKey="jobDescription"
                            title="Job Description"
                          >
                            <div className={`${Styles.about} mt-4`}>
                              {this.state.filter.jobDescription ? (
                                <p>{this.state.filter.jobDescription}</p>
                              ) : (
                                <p>No Job Description</p>
                              )}
                            </div>
                          </Tab>
                          <Tab eventKey="requirments" title="Job Requirments">
                            <div className={`${Styles.about} mt-4`}>
                              {this.state.filter.requirments ? (
                                <p>{this.state.filter.requirments}</p>
                              ) : (
                                <p>No requirments</p>
                              )}
                            </div>
                          </Tab>
                          <Tab eventKey="benefites" title="Job Benefites">
                            <div className={`${Styles.about} mt-4`}>
                              {" "}
                              {this.state.filter.benefites ? (
                                <p>{this.state.filter.benefites}</p>
                              ) : (
                                <p>No Benefites</p>
                              )}
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal
          className={`${Styles.modal}`}
          show={this.state.showModal}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Job Applying</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are You Really Ready To Apply For {this.state.filter.jobPosition}?
          </Modal.Body>
          <Modal.Body>
            To Have More Chances To Win The Job Please Check Your Profile If You
            Need To Add Something{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className={`${Styles.btngrad}`}
              onClick={this.closeModal}
            >
              Close
            </Button>
            <Button
              variant="light"
              className={`${Styles.btngrad}`}
              onClick={() => {
                this.aplyForJob();
                this.closeModal();
              }}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default connect(mapStateToProps)(Inside);
