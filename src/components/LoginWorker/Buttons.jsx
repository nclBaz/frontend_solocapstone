import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import workerImg from "./worker.png";
import companyImg from "./companyLogo.jpg";
import Styles from "./Login.module.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  log: (data) =>
    dispatch({
      type: "ADD_DATA",
      payload: data,
    }),
});

class Buttons extends Component {
  state = {
    worker: "worker",
    company: "company",
  };

  addToReducer = () => {
    if (this.state.worker) {
      this.props.log(this.state.worker);
      if (this.props.log.ok) {
        console.log("aded");
      }
    } else {
      console.log("no data aded");
    }
  };

  addToReduce = () => {
    if (this.state.company) {
      this.props.log(this.state.company);
    } else {
      console.log("no data aded");
    }
  };

  render() {
    return (
      <Row className={`${Styles.choose}`}>
        <Col className={`${Styles.button}`}>
          <img src={workerImg} className={`${Styles.img}`}></img>
          <Button
            variant="primary"
            value="Worker"
            onC
            onClick={(e) => {
              this.props.sendTo();
              this.addToReducer();
            }}
          >
            Worker
          </Button>
        </Col>
        <Col className={`${Styles.button}`}>
          <img src={companyImg} className={`${Styles.img}`}></img>
          <Button
            variant="primary"
            value="Company"
            onClick={(e) => {
              this.props.sendTo();
              this.addToReduce();
            }}
          >
            Company
          </Button>
        </Col>
      </Row>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Buttons)
);
