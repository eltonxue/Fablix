import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

import { searchSingleStar } from './actions';
import { searchSingleMovie } from '../SingleMoviePage/actions';

import { selectSingleStarData, selectSearchSingleStarError } from './selectors';

import { addOneCart } from '../ShoppingCart/actions';
import { selectShoppingCartData, selectShoppingCartError } from '../ShoppingCart/selectors';

import './styles.css';

class SingleStar extends Component {
  constructor(props) {
    super(props);
  }

  handleMovieClick = (movie) => {
    let searchTerms = {};
    searchTerms.title = movie.title.split(' ').join('+');
    searchTerms.director = movie.director.split(' ').join('+');
    searchTerms.year = movie.year;

    this.props.actions.searchSingleMovie(searchTerms);
    this.props.history.push('/SingleMovie');
  };

  render() {
    const star = this.props.singleStarData;
    const starBirthYear = star.data.birthYear == null ? 'unknown' : star.data.birthYear;

    const moviesList = star.movies.map((movie) => (
      <div onClick={() => this.handleMovieClick(movie)} className="movie-item">
        {movie.title}
      </div>
    ));
    return (
      <div className="single-star-container">
        <div className="movie-container movie-container-alternate single-star">
          <div className="movie-header">
            <h1 className="movie-title">
              {star.data.name} ({starBirthYear})
            </h1>
          </div>
          <div className="movie-header">
            <h1 className="movie-title">Featured in...</h1>
          </div>
          <div className="movies-list">{moviesList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    singleStarData: selectSingleStarData(state),
    error: selectSearchSingleStarError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        searchSingleStar,
        searchSingleMovie,
        addOneCart,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStar);
