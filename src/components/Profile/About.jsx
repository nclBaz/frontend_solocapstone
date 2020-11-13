// import React, { useEffect, useState } from "react";
// import { InputGroup, FormControl, Row, Col } from "react-bootstrap";
// import { FiEdit } from "react-icons/fi";
// import { AiOutlineEdit } from "react-icons/ai";

// import { connect } from "react-redux";
// import Styles from "./Styles.module.css";
// import { Modal, Button } from "react-bootstrap";
// const mapStateToProps = (state) => state;
// function About(props) {
//   const url = process.env.REACT_APP_URL;
//   const [about, setabout] = useState("");
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const data = async () => {
//     if (props.profile.profileData && props.profile.profileData.aboutMe) {
//       setabout(props.profile.profileData.aboutMe);
//     }
//   };
//   const change = async () => {
//     const editData = await fetch(url + "profile/edit", {
//       method: "PUT",
//       body: JSON.stringify({ aboutMe: about }),
//       credential: "include",
//       headers: new Headers({
//         "Content-Type": "application/json",
//       }),
//     });

//     const added = await editData.json();
//     setabout(added.aboutMe);
//     props.myProfile();
//   };

//   useEffect(() => {
//     const hello = () => {
//       console.log("he;lllllo");
//     };
//     hello();
//   }, [about]);

//   console.log(about, "what is doing");
//   return (
//     <>
//       <div>
//         <h5>About Me</h5>
//         <AiOutlineEdit
//           // onClick={hideText}
//           className="mt-1"
//           style={{
//             marginLeft: "auto",
//             fontSize: "20px",
//           }}
//           onClick={() => {
//             data();
//             handleShow();
//           }}
//         />
//       </div>

//       {props.profile.profileData && (
//         <div>
//           {props.profile.profileData.aboutMe ? (
//             <p className={`${Styles.aboutMe}`}>
//               {props.profile.profileData.aboutMe}
//             </p>
//           ) : (
//             <p className={`${Styles.aboutMe}`}>About is empty </p>
//           )}
//         </div>
//       )}

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit About</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <InputGroup>
//             <FormControl
//               id="aboutMe"
//               as="textarea"
//               aria-label="With textarea"
//               value={about}
//               onChange={(e) => setabout(e.currentTarget.value)}
//             />
//           </InputGroup>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={() => {
//               change();
//               handleClose();
//             }}
//           >
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
// export default connect(mapStateToProps)(About);

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
    const result = await fetch(url + "profile/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
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
        "Access-Control-Allow-Origin": "*",
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
