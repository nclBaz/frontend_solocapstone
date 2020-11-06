import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdWeb } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import Style from "./Styles.module.css";

import Styles from "./Styles.module.css";
export default function Profile() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const result = await fetch("http://localhost:4006/login/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const data = await result.json();
      setProfile(data);
    }
  };
  console.log(profile);

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
                className={`${Styles.profile}`}
              >
                <div
                  className={`${Styles.header} `}
                  style={{ height: "200px" }}
                >
                  <div className="mt-3 ml-5 " style={{ height: "150px" }}>
                    {data.image ? (
                      <img
                        src={data.image}
                        className={`${Styles.imgProfile}`}
                      />
                    ) : (
                      <img
                        className={`${Styles.imgProfile}`}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9-Tom5eAUi7AaarN_g-WIkVxvRNhdHa8BrQ&usqp=CAU"
                      />
                    )}
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <div className={`${Styles.div}`}>
                  <Row>
                    <Col xs={12} sm={12} md={4} lg={4}>
                      <h5>Personal Info</h5>
                      <div className={`${Style.dataInfo} mt-3`}>
                        <div>
                          <FaUserAlt /> <h6>{data.companyName}</h6>
                        </div>
                        <div>
                          <AiOutlineMail /> <p>{data.email}</p>
                        </div>
                        <div>
                          {" "}
                          <GoLocation />
                          <p>{data.location}</p>
                        </div>
                        <div>
                          {" "}
                          <MdWeb /> <p>{data.website}</p>
                        </div>
                        <div>
                          {" "}
                          <GrUserWorker /> <p>{data.personel}</p>
                        </div>
                      </div>
                    </Col>

                    <Col xs={12} sm={12} md={8} lg={8}>
                      <div>
                        <p>{data.aboutMe}</p>
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
