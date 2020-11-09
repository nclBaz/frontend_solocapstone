import React from "react";
import Posts from "../components/CompanyPosts/Posts";
import Style from "../components/CompanyPosts/Style.module.css";
import { Tabs, Tab } from "react-bootstrap";
export default function CompanyPosts() {
  return (
    <>
      <div className={`${Style.myPosts}`}>
        <Tabs
          defaultActiveKey="posts"
          id="uncontrolled-tab-example"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Tab eventKey="posts" title="Posts">
            <Posts />
          </Tab>
          <Tab eventKey="aplication" title="Aplication"></Tab>
        </Tabs>
      </div>
    </>
  );
}
