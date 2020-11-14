import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Style from "./Styles.module.css";
function Pagination(props) {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalAplicant / props.aplicantPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Button
              className={`${Style.btngrad} ml-1`}
              variant="light"
              style={{
                width: "20px",
                padding: "1px",
                marginTop: "0px",
                border: 0,
              }}
              onClick={() => props.paginate(number)}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
