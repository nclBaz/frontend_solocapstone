import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import Styles from "./Styles.module.css";

import WorkExperience from "./Workexperience";
import Education from "./Education";
import Skills from "./Skills";

export default function FullProfile() {
  return (
    <div className={`${Styles.myTabs} mt-5`}>
      <Tabs
        defaultActiveKey="workexperiences"
        id="uncontrolled-tab-example"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Tab
          eventKey="workexperiences"
          title="Work Experiences"
          style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
        >
          <WorkExperience />
        </Tab>
        <Tab
          eventKey="education"
          title="Education"
          style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
        >
          <Education />
        </Tab>
        <Tab
          eventKey="skills"
          title="Skills"
          style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}
        >
          <Skills />
        </Tab>
      </Tabs>
    </div>
  );
}
