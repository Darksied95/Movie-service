import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "./fakeMovieService";
import { getGenres } from "./fakeGenreService";
import ListGroup from "./ListGroup";
import Pagination from "./pagination";
import MoviesTable from "./MoviesTable";
import { paginate } from "./pagoperation";
import _ from "lodash";
import Search from "./Search";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageCount: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleMovieSearch = (value) => {
    let movies = getMovies().filter((movie) =>
      new RegExp(value, "gi").test(movie.title)
    );
    this.setState({ movies, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageCount,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => {
            return movie.genre._id === selectedGenre._id;
          })
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageCount);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { selectedGenre, sortColumn } = this.state;

    if (count === 0) {
      return (
        <div>
          <h1 style={{ color: "red" }}>
            "There's no movie in the Database!!!"
          </h1>
        </div>
      );
    }
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onFilter={this.handleFilter}
            genres={this.state.genres}
            SelectedGenre={selectedGenre}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary mb-2">
            New Movie
          </Link>
          <h3>
            Showing <span style={{ color: "red" }}>{totalCount}</span> movies in
            the database.
          </h3>
          <Search
            movies={this.state.movies}
            onSearch={this.handleMovieSearch}
          />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            MovieCount={totalCount}
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
