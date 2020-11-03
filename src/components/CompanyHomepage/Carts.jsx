import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Styles from "./Styles.module.css";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";

export default function Carts(props) {
  const getPDF = async (data) => {
    fetch(`http://localhost:4006/login/${data._id}/pdf`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        return response.arrayBuffer();
      })
      .then(function (user) {
        var blob = new Blob([user]);
        var url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.setAttribute("href", url);
        anchor.setAttribute("download", `${data.name}CV.pdf`);
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <>
      {props.currentAplicant &&
        props.currentAplicant.map((data) => {
          return (
            <>
              <Col xs={4} sm={4} md={4} lg={4} className={`${Styles.users}`}>
                <div className={`${Styles.cartblock}`}>
                  {data.image ? (
                    <img
                      src={data.image}
                      className="img-responsive"
                      alt=""
                      onClick={() => {
                        props.setProfile(data._id);

                        props.showButton();
                      }}
                    />
                  ) : (
                    <img
                      src="https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black.png"
                      className="img-responsive"
                      alt=""
                      onClick={() => {
                        props.setProfile(data._id);

                        props.showButton();
                      }}
                    />
                  )}
                  <h3
                    onClick={() => {
                      props.setProfile(data._id);

                      props.showButton();
                    }}
                  >
                    {data.name} {data.surname}
                  </h3>
                  <h6>{data.position}</h6>

                  <Button
                    className={`${Styles.pdf}`}
                    onClick={() => {
                      getPDF(data);
                    }}
                  >
                    {" "}
                    <FaRegFilePdf style={{ fontSize: "20px" }} />
                  </Button>
                </div>
              </Col>
            </>
          );
        })}
    </>
  );
}
