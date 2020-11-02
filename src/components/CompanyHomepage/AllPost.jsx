import React from "react";
import { Row, Col } from "react-bootstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Styles from "./Styles.module.css";
export default function AllPost(props) {
  return (
    <div
      style={{
        boxShadow: "7px 7px 7px rgb(148, 148, 148)",
        transition: "0.5s",
        backgroundColor: "rgb(255, 255, 255)",
      }}
      className={`${Styles.next} ${Styles.dropDown}  `}
    >
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        style={{
          backgroundColor: "white",
          zIndex: "10",
          position: "-webkit-sticky",
          position: "sticky",
          top: "0",
          height: "150px",
        }}
      >
        <h6>hello</h6>
      </Col>

      <Col xs={12} sm={12} md={12} lg={12}>
        <Table className={`${Styles.custab}  pl-2 pr-2`}>
          <Thead>
            <Tr>
              <Th>Position</Th>
              <Th>Application</Th>
              <Th>Created</Th>
              <Th>Salary</Th>
            </Tr>
          </Thead>

          {props.allJob &&
            props.allJob.map((data, i) => {
              return (
                <>
                  <Tbody>
                    <Tr
                      className={`${Styles.custab} `}
                      onClick={() => {
                        props.getPosts(data.allAplication, data._id);
                        props.hideButton();
                      }}
                    >
                      <Td>{data.jobPosition}</Td>
                      <Td style={{ textAlign: "center" }}>
                        {data.allAplication.length}
                      </Td>
                      <Td>{data.createdAt.slice(0, 10)}</Td>
                      <Td>{data.salary}</Td>
                    </Tr>
                  </Tbody>
                </>
              );
            })}
        </Table>
      </Col>
    </div>
  );
}
