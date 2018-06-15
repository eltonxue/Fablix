import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

import LabelInput from '../../components/LabelInput';

import { searchMovies } from '../MovieListPage/actions';
import { selectMoviesData, selectSearchMoviesError } from '../MovieListPage/selectors';

import './styles.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      director: '',
      year: '',
      star: '',
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { title, director, year, star } = this.state;

    let searchTerms = {};

    if (title) {
      searchTerms.title = title.split(' ').join('+');
    }

    if (director) {
      searchTerms.director = director.split(' ').join('+');
    }

    if (year) {
      searchTerms.year = year;
    }

    if (star) {
      searchTerms.star = star.split(' ').join('+');
    }

    // if (Object.keys(searchTerms).length > 0) {
    this.props.actions.searchMovies(searchTerms);
    console.log(this.props);
    this.props.history.push('/MovieList');
    // }
  };
  renderForm = () => {
    return (
      <form className="search-form-container" onSubmit={this.onFormSubmit}>
        <h1 className="title">Search</h1>
        <LabelInput
          name="angle-right"
          placeholder="Gone With The Wind"
          onChange={(e) => this.setState({ title: e.target.value })}
          label="Title"
        />
        <LabelInput
          name="angle-right"
          placeholder="Wong Fu Productions"
          onChange={(e) => this.setState({ director: e.target.value })}
          label="Director"
        />
        <LabelInput
          name="angle-right"
          placeholder="2008"
          onChange={(e) => this.setState({ year: e.target.value })}
          label="Year"
        />
        <LabelInput
          name="angle-right"
          placeholder="Megan Fox"
          onChange={(e) => this.setState({ star: e.target.value })}
          label="Star"
        />
        <Button type="submit" className="search-button">
          SEARCH
        </Button>
      </form>
    );
  };
  render() {
    return <div className="search-container">{this.renderForm()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
