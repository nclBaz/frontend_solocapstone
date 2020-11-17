import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import Style from "./Styles.module.css";

export default function About(props) {
  const [hide, setHide] = useState(false);
  const [about, setAbout] = useState(true);
  const [icon, setIcon] = useState(true);
  const [button, setButton] = useState(false);
  const [info, setInfo] = useState("");
  const [skip, setskip] = useState(false);
  const [getAbout, setGetAbout] = useState("");
  const [hideButton, sethideButton] = useState(true);
  const [showButton, setshowButton] = useState(false);
  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    fetchProfile();
  }, []);

  const hideText = () => {
    if (about === true) {
      setHide(true);
      setAbout(false);
      setIcon(false);
    }
  };
  const showText = () => {
    if (about === false) {
      setHide(false);
      setAbout(true);
      setIcon(true);
    }
  };
  const fetchProfile = async () => {
    const result = await fetch(url + "/profile/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const data = await result.json();
      setGetAbout(data.aboutMe);
      setInfo(data.aboutMe.slice(0, 480));
      if (data.aboutMe.length > 480) {
        setButton(true);
      }
    }
  };
  const data = () => {
    if (skip == true) {
      setInfo(getAbout.slice(0, 481));
      setskip(false);
      sethideButton(true);
      setshowButton(false);
    } else if (skip == false) {
      setInfo(getAbout);
      setskip(true);
      sethideButton(false);
      setshowButton(true);
    }
  };
  const editProfile = async () => {
    const result = await fetch(url + "profile/edit", {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ aboutMe: getAbout }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      fetchProfile();
      showText();
    }
  };

  return (
    <>
      {about && (
        <>
          <div>
            <h5 className="mt-3">About Company</h5>
            {icon && (
              <AiOutlineEdit
                onClick={hideText}
                className="mt-1"
                style={{
                  marginLeft: "auto",
                  fontSize: "20px",
                }}
              />
            )}
          </div>
          <div>
            <p className={`${Style.aboutMe}`}>{info}</p>
          </div>
          <div style={{ marginRight: "auto" }}>
            {button && (
              <>
                {hideButton && (
                  <Button
                    style={{ marginLeft: "auto" }}
                    className={`${Style.btngrad} mr-3 mb-1`}
                    variant="light"
                    onClick={() => data()}
                  >
                    Show More
                  </Button>
                )}
                {showButton && (
                  <Button
                    style={{ marginLeft: "auto" }}
                    className={`${Style.btngrad}  mr-3 mb-1`}
                    variant="light"
                    onClick={() => data()}
                  >
                    Hide{" "}
                  </Button>
                )}
              </>
            )}
          </div>
        </>
      )}
      {hide && (
        <>
          <div>
            <h5>Edit About</h5>
          </div>{" "}
          <div>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              style={{ height: "160px" }}
              value={getAbout}
              onChange={(e) => setGetAbout(e.currentTarget.value)}
            />
          </div>
          <div>
            <Button
              style={{ marginLeft: "auto" }}
              variant="light"
              className={`${Style.btngrad} mr-2`}
              onClick={() => editProfile()}
            >
              Save
            </Button>
            <Button
              variant="light"
              className={`${Style.btngrad}`}
              onClick={showText}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </>
  );
}
