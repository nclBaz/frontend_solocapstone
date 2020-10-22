import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Table,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import Styles from "./Styles.module.css";
import AllAplication from "./AllAplication";
import { connect } from "react-redux";
const mapStateToProps = (state) => state;
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
  };

  componentDidMount = async () => {
    const response = await fetch("http://localhost:4006/profile/allCompanies", {
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
    // 11111111111111

    const result = await fetch(`http://localhost:4006/profile/allPostJobs`, {
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
      this.props.allAplication.allAplication.find(
        (x) => x.postId[0]._id === postId
      )
    ) {
      this.setState({ hideButton: true });
      this.setState({ showButton: false });
      console.log(" u bo , u kry");
    } else {
      this.setState({ hideButton: false });
      this.setState({ showButton: true });
      console.log(
        this.props.allAplication.allAplication.length > 0 &&
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
    const aply = await fetch(
      `http://localhost:4006/aplication/aply/` + this.state.filter._id,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
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
            md={8}
            lg={8}
            className={`${Styles.company} ${Styles.example} `}
            style={{ maxWidth: "800px" }}
          >
            <input
              type="text"
              className={`${Styles.text}`}
              placeholder="Search by job position"
              onChange={(e) => this.filterPost(e.currentTarget.value)}
            />
            <div className="mt-3">
              {this.state.allPost &&
                this.state.allPost.map((data, i) => (
                  <>
                    <div className={`${Styles.render}`}>
                      {data.Image ? (
                        <div key={data._id}>
                          <img
                            src={data.Image}
                            className={`${Styles.image}`}
                          ></img>
                          hello
                        </div>
                      ) : (
                        <div key={data._id}>
                          <img
                            src="https://www.flaticon.com/svg/static/icons/svg/52/52782.svg"
                            className={`${Styles.image}`}
                          />
                        </div>
                      )}
                      <div>
                        <p>{data.companyName}</p>
                        <p>{data.jobPosition}</p>
                        <p>{data.location}</p>
                        <p>{data.jobDescription.slice(0, 30)}</p>
                      </div>
                      <div className={`${Styles.div} pt-3`}>
                        <Button
                          type="button"
                          variant="primary"
                          style={{
                            width: "100%",
                            height: "40%",
                            textAlign: "center",
                          }}
                          onClick={() => this.showCompanies(data)}
                        >
                          View Job
                        </Button>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={4}
            lg={4}
            className={`${Styles.company}`}
            style={{ maxWidth: "400px" }}
          >
            <div>
              {this.state.filter && (
                <div key={this.state.filter._id}>
                  <div className={`${Styles.paragraph}`}>
                    {this.state.filter.Image ? (
                      <img
                        src={this.state.filter.Image}
                        className={`${Styles.image}`}
                        style={{ marginLeft: "30px" }}
                      />
                    ) : (
                      <img
                        src={
                          "https://www.flaticon.com/svg/static/icons/svg/52/52782.svg"
                        }
                        style={{ marginLeft: "30px" }}
                        className={`${Styles.image}`}
                      />
                    )}
                    <p>{this.state.filter.companyName}</p>
                    <p>{this.state.filter.jobPosition}</p>
                    <p>{this.state.filter.location}</p>
                  </div>
                  <div className={`${Styles.desc}`}>
                    <div>
                      <p>{this.state.filter.about}</p>
                      <p>{this.state.filter.jobDescription}</p>
                    </div>
                    <div className={`${Styles.list}`}>
                      <div>
                        {this.state.filter.requirments &&
                          this.state.filter.requirments.map((req, i) => {
                            return (
                              <p>
                                {i + 1} - {req}
                              </p>
                            );
                          })}{" "}
                      </div>

                      <div>
                        {" "}
                        {this.state.filter.benefites &&
                          this.state.filter.benefites.map((benefites, i) => {
                            return (
                              <p>
                                {i + 1} - {benefites}
                              </p>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {this.state.showButton && (
                <Button
                  type="button"
                  variant="success"
                  onClick={() => {
                    this.showModal();
                  }}
                >
                  Apply for Job
                </Button>
              )}
              {this.state.hideButton && (
                <Button type="button" variant="danger">
                  You have applyed
                </Button>
              )}
              <Button
                type="button"
                variant="success"
                onClick={() => {
                  this.toogle();
                }}
              >
                See the company
              </Button>

              {this.state.companies && (
                <div>
                  {this.state.companie && (
                    <div
                      className={`${Styles.list}`}
                      style={{ height: "auto" }}
                    >
                      <div>
                        {this.state.companie.Image ? (
                          <img
                            src={this.state.companie.Image}
                            className={`${Styles.image}`}
                          />
                        ) : (
                          <img
                            src="https://www.flaticon.com/svg/static/icons/svg/52/52782.svg"
                            className={`${Styles.image}`}
                          />
                        )}
                      </div>
                      <p>{this.state.companie.companyName}</p>
                      <p>{this.state.companie.location}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
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
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.aplyForJob();
                this.closeModal();
              }}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>

        <AllAplication postJobs={this.state.allPost} />
      </>
    );
  }
}
export default connect(mapStateToProps)(Inside);
