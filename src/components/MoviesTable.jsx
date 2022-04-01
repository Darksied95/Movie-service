import React, { Component } from "react";
import Liked from "./liked";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

class MoviesTable extends Component {
  columns = [
    { label: "Title", path: "title" },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "Like",
      content: (movie) => (
        <Liked like={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "Delete",
      content: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={this.props.onSort}
          sortColumn={this.props.sortColumn}
        />
        <TableBody columns={this.columns} items={movies} />
        {/* <tbody>
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
        </tbody> */}
      </table>
    );
  }
}

export default MoviesTable;
