import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

import { searchMovies } from '../MovieListPage/actions';

import { searchSingleMovie } from './actions';
import { searchSingleStar } from '../SingleStarPage/actions';

import { selectSingleMovieData, selectSearchSingleMovieError } from './selectors';

import { addOneCart } from '../ShoppingCart/actions';
import { selectShoppingCartData, selectShoppingCartError } from '../ShoppingCart/selectors';

import './styles.css';

class SingleMovie extends Component {
  constructor(props) {
    super(props);
  }

  handleShoppingCart = (movie) => {
    console.log('You Clicked', movie);
    const movieData = {
      movie,
      count: 1,
    };
    this.props.actions.addOneCart(movieData);
  };

  handleGenreClick = (event) => {
    const genre = event.target.firstChild.data;
    let searchTerms = {
      genre: genre.trim(),
    };

    this.props.actions.searchMovies(searchTerms);
    this.props.history.push('/MovieList');
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

  render() {
    const movie = this.props.singleMovieData.data[0];

    let movieStars = null;
    let movieGenres = null;

    if (movie.stars) {
      movieStars = movie.stars.split(',').map((star, i) => (
        <div key={i} onClick={this.handleStarClick} className="movie-star movie-star-alternate">
          {star}
        </div>
      ));
    }


    if (movie.genres) {
      movieGenres = movie.genres.split(',').map((genre, i) => (
        <div key={i} onClick={this.handleGenreClick} className="movie-genre movie-genre-alternate">
          {genre}
        </div>
      ));
    }
    return (
      <div className="single-movie-container">
        <div key={movie.id} className="movie-container alternate single-movie">
          <div className="movie-header">
            <h1 className="movie-title">
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
          <div onClick={() => this.handleShoppingCart(movie)} className="add-to-cart">
            <Button className="add-to-cart-button">Add To Cart</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('selectSingleMovieData', selectSingleMovieData(state));
  console.log('selectSearchSingleMovieError', selectSearchSingleMovieError(state));
  return {
    singleMovieData: selectSingleMovieData(state),
    error: selectSearchSingleMovieError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch', dispatch);
  return {
    actions: bindActionCreators(
      {
        searchMovies,
        searchSingleMovie,
        searchSingleStar,
        addOneCart,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
