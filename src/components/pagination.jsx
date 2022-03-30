import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { MovieCount, PageCount } = props;
  const pagCount = Math.ceil(MovieCount / PageCount);
  const range = _.range(1, pagCount + 1);
  if (pagCount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {range.map((page) => (
          <li
            key={page}
            className={
              props.CurrentPage === page ? "page-item active" : "page-item"
            }
          >
            <a className="page-link" onClick={() => props.OnPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
