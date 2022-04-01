import React from "react";

const ListGroup = ({
  genres,
  textProperty,
  valueProperty,
  onFilter,
  SelectedGenre,
}) => {
  return (
    <ul className="list-group">
      {genres.map((G) => (
        <li
          className={
            SelectedGenre === G ? "list-group-item active" : "list-group-item"
          }
          key={G[valueProperty]}
          onClick={() => onFilter(G)}
        >
          {G[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
