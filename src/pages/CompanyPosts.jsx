import React from "react";
import Posts from "../components/CompanyPosts/Posts";
import Style from "../components/CompanyPosts/Style.module.css";
import { Tabs, Tab } from "react-bootstrap";
export default function CompanyPosts() {
  return (
    <>
      <div className={`${Style.myPosts}`}>
        <Posts />
      </div>
    </>
  );
}
