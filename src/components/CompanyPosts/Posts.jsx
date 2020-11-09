import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./Style.module.css";
import Pagination from "./Pagination";
import { RiDeleteBinLine } from "react-icons/ri";
import AddPost from "./AddPost";

export default function Posts() {
  const [post, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [aplicantPerPage] = useState(3);

  const indexOfLastPost = currentPage * aplicantPerPage;
  const indexOfFirstPost = indexOfLastPost - aplicantPerPage;
  const currentAplicant = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = async () => {
    const result = await fetch("http://localhost:4006/post/", {
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
    }
  };

  const deletePost = async (id) => {
    const result = await fetch("http://localhost:4006/post/deletePost/" + id, {
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

  return (
    <>
      <Row className={`${Style.myPosts}`}>
        <Col xs={12} sm={12} md={12} lg={12}>
          {" "}
          <AddPost fetchPost={fetchPost} />
        </Col>

        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ display: "flex", justifyContent: "space-around" }}
          className={`${Style.myPosts}`}
        >
          {currentAplicant &&
            currentAplicant.map((data) => {
              return (
                <Col xs={12} sm={12} md={4} lg={4}>
                  <div className={`${Style.carts}`}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div>
                        {data.image ? (
                          <img
                            src={data.image}
                            style={{ width: "80px", height: "80px" }}
                          />
                        ) : (
                          <img
                            src="https://ianmartin.com/wp-content/uploads/2017/10/WhatE28099s20the20Best20Day20of20the20Week20to20Post20a20Job20Ad-1030x687.jpg"
                            style={{ width: "80px", height: "80px" }}
                          />
                        )}
                      </div>
                      <div>
                        <p>{data.companyName}</p>
                        <p>{data.jobPosition}</p>
                        <p>{data.salary}</p>
                      </div>
                      <div>
                        <RiDeleteBinLine onClick={() => deletePost(data._id)} />
                      </div>
                    </div>
                    <div>
                      <p>{data.jobDescription}</p>
                      <p>
                        {data.requirments.map((req) => {
                          return <>{req},</>;
                        })}
                      </p>
                      <p>
                        {data.benefites.map((req) => {
                          return <>{req}</>;
                        })}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })}
          {currentAplicant.length === 0 && (
            <>
              <div className="mt-5">
                <h6>You have no Post. Add New Post</h6>
                <img
                  className="mt-0"
                  src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_1280.png"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
            </>
          )}
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className="mt-1 ">
          <Pagination
            aplicantPerPage={aplicantPerPage}
            totalAplicant={post.length}
            paginate={paginate}
          />
        </Col>
      </Row>
    </>
  );
}
