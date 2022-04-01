import React from "react";

const Liked = ({ like, onClick }) => {
  let classes = "fa fa-heart";
  if (like) classes += "-o";
  return <i className={classes} aria-hidden="true" onClick={onClick} />;
};

export default Liked;
