import React, { useState, useEffect } from "react";
import { Table, Row, Container } from "react-bootstrap";
import Styles from "./Styles.module.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  log: (data) =>
    dispatch({
      type: "ADD_APLICATION",
      payload: data,
    }),
});

function AllAplication(props) {
  const [aplication, setAplication] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const aplication = await fetch(
        `http://localhost:4006/aplication/getAllAplication`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const getAllAplication = await aplication.json();
      setAplication(getAllAplication);
      props.log(getAllAplication);
    };
    fetchData();
  }, []);

  //  componentDidUpdate(prevProps) {
  //     if (  prevProps.allAplication.allAplication!== this.props.allAplication.allAplication) {
  //      this.setState({allAplication:this.props.allAplication.allAplication});
  //      console.log(this.props.allAplication.allAplication,"si eshte")
  //      console.log(prevProps.allAplication.allAplication,"si ishte")
  //    }
  //  }

  return (
    <div className={`${Styles.table}`}>
      <Container>
        <h3 className={`${Styles.title}`}>This are All Your Job Aplication</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>CompanyName</th>
              <th>Position</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {aplication &&
              aplication.map((x, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{x.postId[0].companyName}</td>
                    <td>{x.postId[0].jobPosition}</td>
                    {x.answer && x.answer === "no answer" ? (
                      <td>JOB Is Still In Review</td>
                    ) : x.answer === "accepted" ? (
                      <td>Accepted. Check Email </td>
                    ) : (
                      <td>Denied.Check Email</td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAplication);
