import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import Autocomplete from 'react-autocomplete';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Elasticlunr from 'elasticlunr';

import LabelInput from '../../components/LabelInput';

import { searchFullTextMovies, emptyMovieData } from '../MovieListPage/actions';
import { selectMoviesData, selectSearchMoviesError, selectStarsData, selectStarsCache, selectMoviesCache } from '../MovieListPage/selectors';

import { searchSingleMovie } from '../SingleMoviePage/actions';
import { searchSingleStar } from '../SingleStarPage/actions';

import './styles.css';
//[{movies: [] }, {stars: []}]

const menuStyle = {
  boxSizing: 'border-box',
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '0 10px',
  fontSize: '90%',
  position: 'absolute',
  overflow: 'auto',
  maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
  width: '322px',
}

function contains(items, text, field) {
    return items.filter(function (item) {
        return text.split(' ').every(function (el) {
          return item[field].indexOf(el) > -1;
        });
    });
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      loading: false,
      useCache: false,
    };
    this.requestTimeout = null;
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const { title, director, year, star } = this.state;

    this.props.history.push('/MovieList');
    // }
  };

  handleMovieClick = (movie) => {
    let searchTerms = {};
    searchTerms.title = movie.title.split(' ').join('+');
    searchTerms.director = movie.director.split(' ').join('+');
    searchTerms.year = movie.year;

    this.props.actions.searchSingleMovie(searchTerms);
    this.props.history.push('/SingleMovie');
  };

  handleStarClick = (event) => {
    let searchTerms = {};
    const star = event
    searchTerms.star = star.name
      .trim()
      .split(' ')
      .join('+');

    this.props.actions.searchSingleStar(searchTerms);
    this.props.history.push('/SingleStar');
  };

  onAutoCompleteChange = (event, value) => {
    clearTimeout(this.requestTimeout)
    this.setState({
      value
    })

    if (value.length >= 3) {
      if (this.props.moviesCache[value.trim()] !== undefined && this.props.starsCache[value.trim()] !== undefined) {
        this.setState({useCache: true})
        console.log('USE CACHE RESULT')
      }
      else {
        this.setState({useCache: false})

        this.requestTimeout = setTimeout(() => {
          console.log('Server autocomplete search is initiated')
          console.log('USE SERVER RESULT')

          const searchMovieTerms = {
            type: 'movie',
            query: value.split(' ').join('+'),
            rawValue: value,
          }

          const searchStarTerms = {
            type: 'star',
            query: value.split(' ').join('+'),
            rawValue: value,
          }

          this.props.actions.searchFullTextMovies(searchStarTerms)
          this.props.actions.searchFullTextMovies(searchMovieTerms)
        }, 300)
      }
    }
    else {
      // this.props.actions.emptyMovieData();
    }
  }

  getAutoCompleteItems = () => {
    if (this.state.value.length < 3) {
      return []
    }
    if (this.state.useCache && this.props.moviesCache[this.state.value.trim()] && this.props.starsCache[this.state.value.trim()]) {
      return [{header: 'Movies'}, ...this.props.moviesCache[this.state.value.trim()].data.slice(0,5), {header: 'Stars'}, ...this.props.starsCache[this.state.value.trim()].data.slice(0,5)]
    }
    if (this.props.moviesData && this.props.starsData) {
      return [{header: 'Movies'}, ...this.props.moviesData.data.slice(0,5), {header: 'Stars'}, ...this.props.starsData.data.slice(0,5)]
    }
    else {
      return [{header: 'Movies'}, {header: 'Stars'}]
    }
  }

  getAutoCompleteLabel = (item) => {
    if (item.name) {
      return item.name
    }
    else if (item.title) {
      return item.title
    }
  }

  render() {
    return (
      <div className="home-container">
        <div className="full-text-search-container">
          <h1 className="redirects-title">Fablix</h1>
          <form onSubmit={this.onFormSubmit}>
            <div className='search-bar-container'>
              <Autocomplete
                inputProps={{
                  className: 'autocomplete-field'
                }}
                menuStyle={menuStyle}
                autoHighlight={false}
                value={this.state.value}
                items={this.getAutoCompleteItems()}
                getItemValue={this.getAutoCompleteLabel}
                renderItem={(item, isHighlighted) => {
                  if (item.header) {
                    return (
                      <div className='autocomplete-header'>
                        {item.header}
                      </div>
                    )
                  }
                  else {
                    if (item.title) {
                      return (
                        <div className='autocom-item' style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                          {item.title}
                        </div>
                      )
                    }
                    return (
                      <div className='autocom-item' style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.name}
                      </div>
                    )
                  }
                  }
                }
                onChange={this.onAutoCompleteChange}
                onSelect={(value, state) => {
                  this.setState({value})
                  if (state.title) {
                      this.handleMovieClick(state)
                  }
                  if (state.name) {
                    this.handleStarClick(state)
                  }
                }}
              />
              <button type='submit' className='buttons-container'>
                <FontAwesome className="icon" name="search" size='2x' />
              </button>
            </div>
          </form>

          <div className="buttons-container">
            <Link to="/Search" className="redirect">
              <FontAwesome className="icon" name="search" />
              Search
            </Link>
            <Link to="/Browse" className="redirect">
              <FontAwesome className="icon" name="eye" />
              Browse
            </Link>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    moviesData: selectMoviesData(state),
    starsData: selectStarsData(state),
    moviesCache: selectMoviesCache(state),
    starsCache: selectStarsCache(state),
    error: selectSearchMoviesError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        searchFullTextMovies,
        emptyMovieData,
        searchSingleMovie,
        searchSingleStar,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
