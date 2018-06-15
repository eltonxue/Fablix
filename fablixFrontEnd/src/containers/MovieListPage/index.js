import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

import {
  searchMovies,
  sortTitleAscending,
  sortTitleDescending,
  sortYearAscending,
  sortYearDescending,
} from './actions';

import { selectMoviesData, selectSearchMoviesError } from './selectors';

import { addOneCart } from '../ShoppingCart/actions';
import { selectShoppingCartData, selectShoppingCartError } from '../ShoppingCart/selectors';

import { searchSingleMovie } from '../SingleMoviePage/actions';
import { searchSingleStar } from '../SingleStarPage/actions';

import './styles.css';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      currentPage: 1,
      moviesPerPage: 5,
      currentMoviesPerPage: 5,
    };
  }

  sortTitleAscending = () => {
    this.props.actions.sortTitleAscending();
  };

  sortTitleDescending = () => {
    this.props.actions.sortTitleDescending();
  };

  sortYearAscending = () => {
    this.props.actions.sortYearAscending();
  };

  sortYearDescending = () => {
    this.props.actions.sortYearDescending();
  };

  onMoviesPerPage = (n) => {
    console.log(n);
  };

  handlePrevClick = (event) => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  handleNextClick = (event) => {
    const totalMoviesCount = this.props.moviesData.data.length / this.state.currentMoviesPerPage;
    if (this.state.currentPage < totalMoviesCount) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  handlePageClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  handlePerPageClick = (n) => {
    this.setState({
      moviesPerPage: n,
      currentMoviesPerPage: n,
      currentPage: 1,
    });
  };

  handleShoppingCart = (movie) => {
    console.log('You Clicked', movie);
    const movieData = {
      movie,
      count: 1,
    };
    this.props.actions.addOneCart(movieData);
  };

  handleMovieClick = (movie) => {
    console.log(movie);
    let searchTerms = {};
    searchTerms.title = movie.title.split(' ').join('+');
    searchTerms.director = movie.director.split(' ').join('+');
    searchTerms.year = movie.year;

    this.props.actions.searchSingleMovie(searchTerms);
    this.props.history.push('/SingleMovie');
  };

  handleGenreClick = (event) => {
    const genre = event.target.firstChild.data;
    let searchTerms = {
      genre: genre.trim(),
    };

    this.props.actions.searchMovies(searchTerms);
  };

  handleStarClick = (event) => {
    let searchTerms = {};
    const star = event.target.firstChild.data;
    console.log(`STAR: ${star}`);
    searchTerms.star = star
      .trim()
      .split(' ')
      .join('+');

    this.props.actions.searchSingleStar(searchTerms);
    this.props.history.push('/SingleStar');
  };

  renderActions = () => {
    const numbers = [5, 10, 20, 50, 100];

    const pageNumbers = numbers.map((number, index) => {
      if (number == this.state.currentMoviesPerPage) {
        return (
          <span key={index} className="n n-active" onClick={() => this.handlePerPageClick(number)}>
            {number}
          </span>
        );
      } else {
        return (
          <span key={index} className="n" onClick={() => this.handlePerPageClick(number)}>
            {number}
          </span>
        );
      }
    });

    return (
      <div className="action-bar">
        <div className="action" onClick={this.sortTitleAscending}>
          <FontAwesome className="icon large-icon" name="caret-up" />Title
        </div>
        <div className="action" onClick={this.sortTitleDescending}>
          <FontAwesome className="icon large-icon" name="caret-down" />Title
        </div>
        <div className="action" onClick={this.sortYearAscending}>
          <FontAwesome className="icon large-icon" name="caret-up" />Year
        </div>
        <div className="action" onClick={this.sortYearDescending}>
          <FontAwesome className="icon large-icon" name="caret-down" />Year
        </div>
        <div className="action-per-page">
          Movies Per Page --
          {pageNumbers}
        </div>
      </div>
    );
  };

  renderPagination = (pageNumbers) => {
    const renderPageNumbers = pageNumbers.map((number, index) => {
      if (number == this.state.currentPage) {
        return (
          <div
            className="page-number page-number-active"
            key={index}
            id={number}
            onClick={this.handlePageClick}
          >
            {number}
          </div>
        );
      } else {
        return (
          <div className="page-number" key={index} id={number} onClick={this.handlePageClick}>
            {number}
          </div>
        );
      }
    });
    return <div className="pagination-bar">{renderPageNumbers}</div>;
  };

  render() {
    console.log('rerendering...');
    if (this.props.moviesData) {
      const { currentPage, moviesPerPage } = this.state;
      const movies = this.props.moviesData.data;
      const indexOfLastMovie = currentPage * moviesPerPage;
      const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
      const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

      const moviesData = currentMovies.map((movie, index) => {
        console.log('moviedata', movie);
        console.log('this', this);
        if (index % 2 === 0) {
          const movieStars = movie.stars.split(',').map((star, i) => (
            <div key={i} onClick={this.handleStarClick} className="movie-star movie-star-alternate">
              {star}
            </div>
          ));

          const movieGenres = movie.genres.split(',').map((genre, i) => (
            <div
              key={i}
              onClick={this.handleGenreClick}
              className="movie-genre movie-genre-alternate"
            >
              {genre}
            </div>
          ));

          return (
            <div key={index} className="movie-container alternate">
              <div className="movie-header">
                <h1 className="movie-title" onClick={() => this.handleMovieClick(movie)}>
                  {movie.title} ({movie.year})
                </h1>
                <div className="movie-rating movie-rating-alternate">{movie.rating}</div>
              </div>
              <div className="movie-director">Directed By: {movie.director} </div>
              <div className="movie-director">Movie ID: {movie.id}</div>
              <div className="movie-genres">
                <h2>Genres: {movieGenres}</h2>
              </div>
              <div className="movie-stars">
                <h2>Stars: {movieStars}</h2>
              </div>
              <div className="add-to-cart">
                <Button
                  onClick={() => this.handleShoppingCart(movie)}
                  className="add-to-cart-button"
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          );
        } else {
          const movieStars = movie.stars.split(',').map((star, i) => (
            <div key={i} onClick={this.handleStarClick} className="movie-star">
              {star}
            </div>
          ));

          const movieGenres = movie.genres.split(',').map((genre, i) => (
            <div key={i} onClick={this.handleGenreClick} className="movie-genre">
              {genre}
            </div>
          ));
          return (
            <div key={index} className="movie-container movie-container-alternate">
              <div className="movie-header">
                <h1 className="movie-title" onClick={() => this.handleMovieClick(movie)}>
                  {movie.title} ({movie.year})
                </h1>
                <div className="movie-rating">{movie.rating}</div>
              </div>
              <div className="movie-director">Directed By: {movie.director}</div>
              <div className="movie-director">Movie ID: {movie.id}</div>
              <div className="movie-genres">
                <h2>Genres: {movieGenres}</h2>
              </div>
              <div className="movie-stars">
                <h2>Stars: {movieStars}</h2>
              </div>
              <div className="add-to-cart">
                <Button
                  onClick={() => this.handleShoppingCart(movie)}
                  className="add-to-cart-button"
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          );
        }
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(movies.length / moviesPerPage); i++) {
        pageNumbers.push(i);
      }

      return (
        <div className="movies-list-container">
          <h1 className="page-title">
            Movies
            <FontAwesome name="rocket" />
          </h1>
          <div className="action-bar-container">{this.renderActions()}</div>
          <div className="prev-next-container">
            <div className="button" onClick={this.handlePrevClick}>
              PREV
            </div>
            <div className="button" onClick={this.handleNextClick}>
              NEXT
            </div>
          </div>
          <div className="pagination-bar-container">{this.renderPagination(pageNumbers)}</div>
          <div className="movies-container">{moviesData}</div>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => {
  console.log('selectMoviesData', selectMoviesData(state));
  console.log('selectSearchMoviesError', selectSearchMoviesError(state));
  return {
    moviesData: selectMoviesData(state),
    error: selectSearchMoviesError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch', dispatch);
  return {
    actions: bindActionCreators(
      {
        searchMovies,
        sortTitleAscending,
        sortTitleDescending,
        sortYearAscending,
        sortYearDescending,
        addOneCart,
        searchSingleMovie,
        searchSingleStar,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
