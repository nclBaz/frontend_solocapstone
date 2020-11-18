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
          className={`${Styles.tabs}`}
        >
          <WorkExperience />
        </Tab>
        <Tab
          eventKey="education"
          title="Education"
          className={`${Styles.tabs}`}
        >
          <Education />
        </Tab>
        <Tab eventKey="skills" title="Skills" className={`${Styles.tabs1}`}>
          <Skills />
        </Tab>
      </Tabs>
    </div>
  );
}
