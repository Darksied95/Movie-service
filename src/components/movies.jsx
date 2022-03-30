import React, { Component } from "react";
import { getMovies } from "./fakeMovieService";
import { getGenres } from "./fakeGenreService";
import Liked from "./liked";
import ListGroup from "./ListGroup";
import Pagination from "./pagination";
import { paginate } from "./pagoperation";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageCount: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => {
      return movie._id !== m._id;
    });
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };

    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleFilter = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      pageCount,
      currentPage,
      selectedGenre,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => {
            return movie.genre._id === selectedGenre._id;
          })
        : allMovies;
    if (count === 0) {
      return (
        <h1 style={{ color: "red" }}>"There's no movie in the Database!!!"</h1>
      );
    }
    const movies = paginate(filtered, currentPage, pageCount);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onFilter={this.handleFilter}
            genres={this.state.genres}
            SelectedGenre={this.state.selectedGenre}
            onHandleAllGenres={this.handleAllGenres}
          />
        </div>
        <div className="col">
          <h3>
            Showing <span style={{ color: "red" }}>{filtered.length}</span>{" "}
            movies in the database.
          </h3>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>Like</th>
                <th></th>
              </tr>
            </thead>
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
                      <Liked
                        like={movie.liked}
                        onClick={() => this.handleLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(movie)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            MovieCount={filtered.length}
            PageCount={this.state.pageCount}
            OnPageChange={this.handlePageChange}
            CurrentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
