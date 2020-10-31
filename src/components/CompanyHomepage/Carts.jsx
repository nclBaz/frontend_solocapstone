import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Styles from "./Styles.module.css";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

export default function Carts(props) {
  return (
    <>
      {props.currentAplicant &&
        props.currentAplicant.map((data) => {
          return (
            <>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Card
                  className={`${Styles.aply}  `}
                  onClick={() => {
                    props.fetchWorker(data._id);
                    props.about();
                  }}
                >
                  {data.image ? (
                    <Card.Img
                      variant="top"
                      src={data.image}
                      className={`${Styles.imagesCard}  `}
                    />
                  ) : (
                    <Card.Img
                      variant="top"
                      className={`${Styles.imagesCard}  `}
                      src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                    />
                  )}

                  <Card.Text
                    className={` ${Styles.textCard} mt-2 mb-0 text-center`}
                  >
                    <Row className={`${Styles.textRow}`}>
                      {" "}
                      <FaUserAlt className={`${Styles.icon}`} />{" "}
                      <p className={`${Styles.titleCard} ${Styles.textCard}  `}>
                        {data.name} {data.surname}
                      </p>
                    </Row>
                  </Card.Text>
                  <Card.Text className={` ${Styles.textCard} ml-1   `}>
                    <Row className={`${Styles.textRow}`}>
                      <BsFillBriefcaseFill
                        style={{ marginTop: "3px" }}
                        className={`${Styles.icon} ml-0`}
                      />{" "}
                      <p className={`${Styles.normalText} ${Styles.textCard}`}>
                        {" "}
                        {data.position}
                      </p>
                    </Row>
                  </Card.Text>
                  {/* </Card.Body> */}
                </Card>
              </Col>
            </>
          );
        })}
    </>
  );
}
