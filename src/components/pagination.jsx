import React from "react";
import _ from "lodash";

const Pagination = ({ MovieCount, PageCount, OnPageChange, CurrentPage }) => {
  const pagCount = Math.ceil(MovieCount / PageCount);
  const range = _.range(1, pagCount + 1);
  if (pagCount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {range.map((page) => (
          <li
            key={page}
            className={CurrentPage === page ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => OnPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
