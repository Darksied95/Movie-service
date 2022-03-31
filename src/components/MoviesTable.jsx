import React, { Component } from "react";
import Liked from "./liked";
import TableHeader from "./tableHeader";

class MoviesTable extends Component {
  columns = [
    { label: "Title", path: "title" },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    { label: "Like" },
    { key: "Delete" },
  ];
  render() {
    const { movies, onLike, onDelete } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={this.props.onSort}
          sortColumn={this.props.sortColumn}
        />
        <tbody>
          {movies.map((movie) => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  {" "}
                  <Liked like={movie.liked} onClick={() => onLike(movie)} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
