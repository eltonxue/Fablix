import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

import LabelInput from '../../components/LabelInput';

import { searchMovies } from '../MovieListPage/actions';
import { selectMoviesData, selectSearchMoviesError } from '../MovieListPage/selectors';

import './styles.css';

class Browse extends Component {
  constructor(props) {
    super(props);
  }

  handleGenreClick = (e) => {
    console.log('BITCONNNECTTTT');
    console.log(e.target);
    this.props.actions.searchMovies({ genre: e.target.innerHTML });
    this.props.history.push('/MovieList');
  };

  handleTitleClick = (e) => {
    console.log(e.target.value);
    this.props.actions.searchMovies({ startWith: e.target.innerHTML });
    this.props.history.push('/MovieList');
  };
  renderBrowseBy = () => {
    const genres = [
      'Action',
      'Adult',
      'Adventure',
      'Animation',
      'Biography',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Family',
      'Fantasy',
      'History',
      'Horror',
      'Music',
      'Musical',
      'Mystery',
      'Reality-TV',
      'Romance',
      'Sci-Fi',
      'Sport',
      'Thriller',
      'War',
      'Western',
    ];

    let allGenres = genres.map((genre, index) => {
      return (
        <div key={index} className="search-by" onClick={this.handleGenreClick}>
          {genre}
        </div>
      );
    });

    const letters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

    let allLetters = letters.map((letter, index) => {
      return (
        <div key={index} className="search-by" onClick={this.handleTitleClick}>
          {letter.toUpperCase()}
        </div>
      );
    });

    return (
      <form className="browse-container">
        <h1 className="title">Browse By Genre</h1>
        <div className="search-by-container">{allGenres}</div>
        <h1 className="title">Browse By Title</h1>
        <div className="search-by-container">{allLetters}</div>
      </form>
    );
  };

  render() {
    return (
      <div className="browse-main-container">
        <div className="browse-by-container">{this.renderBrowseBy()}</div>
      </div>
    );
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
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
