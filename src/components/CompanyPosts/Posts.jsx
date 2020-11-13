import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Style from "./Style.module.css";
import Pagination from "./Pagination";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import AddPost from "./AddPost";
import EditPost from "./EditPost";

export default function Posts() {
  const [post, setPost] = useState([]);
  const [newPost, setnewPost] = useState([]);
  const [show1, setShow1] = useState(false);
  const [infos, setinfos] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [aplicantPerPage] = useState(3);
  const url = process.env.REACT_APP_URL;

  const indexOfLastPost = currentPage * aplicantPerPage;
  const indexOfFirstPost = indexOfLastPost - aplicantPerPage;
  const currentAplicant = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = (data) => {
    setShow1(true);
    setinfos(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = async () => {
    const result = await fetch(url + "post/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const data = await result.json();
      setPost(data);
      setnewPost(data);
    }
  };

  const deletePost = async (id) => {
    const result = await fetch(url + "post/deletePost/" + id, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      fetchPost();
    }
  };
  const filterPost = (e) => {
    console.log(e);
    const text = e;
    if (text) {
      const filterPost = post.filter((x) =>
        x.jobPosition.toLowerCase().includes(text.toLowerCase())
      );
      if (filterPost) {
        setPost(filterPost);
      }
    } else {
      setPost(newPost);
    }
  };
  console.log(infos);
  return (
    <>
      <Row className={`${Style.myPosts}`}>
        <Col xs={12} sm={12} md={12} lg={12}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <AddPost fetchPost={fetchPost} />
            </div>
            <div
            //   style={{
            //     marginLeft: "auto",
            //     marginRight: "auto",
            //   }}
            >
              {" "}
              <input
                className="mt-2 mb-1"
                type="text"
                style={{
                  height: "40px",
                }}
                placeholder="Search by Job Position"
                onChange={(e) => filterPost(e.currentTarget.value)}
              />
            </div>
          </div>
        </Col>

        {currentAplicant &&
          currentAplicant.map((data) => {
            return (
              <Col xs={12} sm={12} md={4} lg={4}>
                <div className={`${Style.carts} mt-1`}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      boxShadow: "3px 3px 3px  rgba(212, 212, 212, 0.938)",
                    }}
                  >
                    <div>
                      {data.image ? (
                        <img
                          className="mt-5"
                          src={data.image}
                          style={{ width: "80px", height: "80px" }}
                        />
                      ) : (
                        <img
                          className="mt-5"
                          src="https://ianmartin.com/wp-content/uploads/2017/10/WhatE28099s20the20Best20Day20of20the20Week20to20Post20a20Job20Ad-1030x687.jpg"
                          style={{ width: "80px", height: "80px" }}
                        />
                      )}
                    </div>
                    <div className="mt-1">
                      <p>{data.companyName}</p>
                      <p>{data.jobPosition}</p>
                      <p>{data.salary}</p>
                      <p>{data.type}</p>
                    </div>
                    <div className="mt-1">
                      <RiDeleteBinLine onClick={() => deletePost(data._id)} />

                      <AiOutlineEdit
                        className="ml-2"
                        onClick={() => {
                          handleShow1(data._id);
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${Style.about} ml-1 mr-1`}>
                    <div>
                      <h6>Job Description</h6>
                      {data.jobDescription ? (
                        <p>{data.jobDescription}</p>
                      ) : (
                        <p>No Description Detail . </p>
                      )}
                    </div>
                    <div>
                      <h6>Job Requirments</h6>
                      {data.requirments ? (
                        <p>{data.requirments}</p>
                      ) : (
                        <p>No Requirments Detail </p>
                      )}
                    </div>
                    <div>
                      <h6>Job Benefites</h6>
                      {data.benefites ? (
                        <p>{data.benefites}</p>
                      ) : (
                        <p>No Befenefites Detail</p>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}

        {currentAplicant.length === 0 && (
          <>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              <div className="mt-5">
                <h6>You have no Post. Add New Post</h6>
                <img
                  className="mt-0"
                  src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_1280.png"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
            </Col>
          </>
        )}

        <Col xs={12} sm={12} md={12} lg={12} className="mt-1 ">
          <Pagination
            aplicantPerPage={aplicantPerPage}
            totalAplicant={post.length}
            paginate={paginate}
          />
        </Col>
      </Row>
      <EditPost
        show={show1}
        handleClose={handleClose1}
        handleShow={handleShow1}
        data={infos}
        fetchPost={fetchPost}
      />
    </>
  );
}
