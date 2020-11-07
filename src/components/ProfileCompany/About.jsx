import React, { useEffect, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import Style from "./Styles.module.css";

export default function About(props) {
  const [hide, sethide] = useState(false);
  const [about, setabout] = useState(true);

  return (
    <>
      {about && (
        <>
          <div>
            <h5>About Company</h5>
            <AiOutlineEdit
              className="mt-1"
              style={{
                marginLeft: "auto",
                fontSize: "20px",
              }}
            />
          </div>
          <div>
            <p>{props.data}</p>
          </div>
        </>
      )}
      {hide && (
        <div>
          <h5>Edit About</h5>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>With textarea</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea" aria-label="With textarea" />
          </InputGroup>
        </div>
      )}
    </>
  );
}
