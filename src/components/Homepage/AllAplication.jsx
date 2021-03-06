import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Styles from "./Styles.module.css";
import Pagination from "./Pagination";
import { RiDeleteBin5Fill } from "react-icons/ri";
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
  const url = process.env.REACT_APP_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [aplicantPerPage] = useState(30);

  const indexOfLastPost = currentPage * aplicantPerPage;
  const indexOfFirstPost = indexOfLastPost - aplicantPerPage;
  const currentAplicant = aplication.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const aplication = await fetch(url + `/aplication/getAllAplication`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const getAllAplication = await aplication.json();
    setAplication(getAllAplication);
    props.log(getAllAplication);
    console.log(getAllAplication, "show post");
  };

  const deleteAplication = async (id) => {
    const aplication = await fetch(url + `/aplication/getAplication/` + id, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (aplication.ok) {
      fetchData();
    }
  };

  return (
    <Row className={`${Styles.table} `} style={{ marginTop: "10px" }}>
      <Col xs={12} sm={12} md={12} lg={12}>
        <div
          style={{
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
            boxShadow: "2px 2px 2px 2px rgba(212, 212, 212, 0.938)",
          }}
        >
          <h3
            className={`${Styles.title}`}
            style={{
              color: "rgb(63, 69, 95)",
            }}
          >
            This are All Your Job Aplication
          </h3>
          <Table
            style={{
              width: "90%",
              color: "rgb(63, 69, 95)",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "2px 2px 2px rgba(212, 212, 212, 0.938)",
            }}
          >
            <Thead>
              <Tr>
                <Th
                  style={{
                    textAlign: "center",
                    borderRight: "solid grey 2px",
                  }}
                >
                  Nr
                </Th>
                <Th
                  style={{
                    textAlign: "center",
                    borderRight: "solid grey 2px",
                  }}
                >
                  Company
                </Th>

                <Th
                  style={{
                    textAlign: "center",
                    borderRight: "solid grey 2px",
                  }}
                >
                  Position
                </Th>
                <Th
                  style={{ textAlign: "center", borderRight: "solid grey 2px" }}
                >
                  {" "}
                  Answer
                </Th>
                <Th style={{ textAlign: "center" }}> Remove </Th>
              </Tr>
            </Thead>

            {aplication &&
              aplication.map((x, i) => {
                return (
                  <Tbody className={`${Styles.rows}`}>
                    {" "}
                    <Tr
                      style={{
                        textAlign: "center",
                        borderTop: "solid grey 2px",
                      }}
                    >
                      <Td
                        style={{
                          borderRight: "solid grey 2px",
                          borderTop: "solid grey 2px",
                        }}
                      >
                        {i + 1}
                      </Td>
                      <Td
                        style={{
                          borderRight: "solid grey 2px",
                          borderTop: "solid grey 2px",
                        }}
                      >
                        {x.postId[0] && x.postId[0].companyName}
                      </Td>

                      <Td
                        style={{
                          borderRight: "solid grey 2px",
                          borderTop: "solid grey 2px",
                        }}
                      >
                        {x.postId[0] && x.postId[0].jobPosition}
                      </Td>

                      {x.answer && x.answer === "no answer" ? (
                        <Td
                          style={{
                            borderTop: "solid grey 2px",
                            borderRight: "solid grey 2px",
                          }}
                        >
                          JOB Is Still In Review
                        </Td>
                      ) : x.answer === "accepted" ? (
                        <Td
                          style={{
                            borderTop: "solid grey 2px",
                            borderRight: "solid grey 2px",
                          }}
                        >
                          Accepted. Check Email{" "}
                        </Td>
                      ) : (
                        <Td
                          style={{
                            borderTop: "solid grey 2px",
                            borderRight: "solid grey 2px",
                          }}
                        >
                          Denied.Check Email
                        </Td>
                      )}
                      <Td
                        style={{
                          borderTop: "solid grey 2px",
                        }}
                      >
                        <RiDeleteBin5Fill
                          onClick={() => deleteAplication(x._id)}
                        />
                      </Td>
                    </Tr>{" "}
                  </Tbody>
                );
              })}
          </Table>

          <Pagination
            className="mt-5"
            aplicantPerPage={aplicantPerPage}
            totalAplicant={aplication.length}
            paginate={paginate}
          />
        </div>
      </Col>
    </Row>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAplication);
