import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import { addStar, addMovie, clearDashboardReducer } from './actions';

import LabelInput from '../../components/LabelInput';

import './styles.css';

class EmployeeDashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieID: '',
      title: '',
      director: '',
      year: '',
      star: '',
      genre: '',
      starFullName: '',
      starBirthYear: '',
      addStarEmptyFields: '',
      addMovieEmptyFields: '',
    };

    this.props.actions.clearDashboardReducer();
  }

  handleAddStarClick = (e) => {
    // Check if birth year is an integer and no empty fields

    const { starFullName, starBirthYear } = this.state;

    const noEmptyFields = starFullName && starBirthYear;

    if (noEmptyFields) {
      if (this.state.starBirthYear == parseInt(this.state.starBirthYear, 10)) {
        const starData = {
          fullName: this.state.starFullName,
          birthYear: this.state.starBirthYear,
        };

        this.props.actions.addStar(starData);

        this.setState({
          addStarError: '',
          starFullName: '',
          starBirthYear: '',
        });
      } else {
        this.setState({ addStarError: 'Birth year must be a number.' });
      }
    } else {
      this.setState({ addStarError: 'Empty fields' });
    }
  };

  handleAddMovieClick = (e) => {
    // Check if year is an integer and no empty fields

    const { movieID, title, director, year, star, genre } = this.state;

    const noEmptyFields = movieID && title && director && year && star && genre;

    if (noEmptyFields) {
      if (this.state.year == parseInt(this.state.year, 10)) {
        const movieData = {
          movieId: this.state.movieID,
          title: this.state.title,
          director: this.state.director,
          year: this.state.year,
          star: this.state.star,
          genre: this.state.genre,
        };

        this.props.actions.addMovie(movieData);

        this.setState({
          addMovieError: '',
          movieID: '',
          title: '',
          director: '',
          year: '',
          star: '',
          genre: '',
        });
      } else {
        this.setState({ addMovieError: 'Year must be a number.' });
      }
    } else {
      this.setState({ addMovieError: 'Empty fields.' });
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('receiving props...');
  }

  render() {
    return (
      <div id="dashboard-container">
        <h1 id="dashboard-title">Employee Dashboard</h1>
        <div id="features-container">
          <div className="three-columns-container">
            <h1 className="title">Add Movie</h1>
            <div id="add-movie-form">
              <LabelInput
                name="angle-right"
                placeholder="t1234567"
                onChange={(e) => this.setState({ movieID: e.target.value })}
                label="Movie ID"
                value={this.state.movieID}
              />
              <LabelInput
                name="angle-right"
                placeholder="Gone With The Wind"
                onChange={(e) => this.setState({ title: e.target.value })}
                label="Title"
                value={this.state.title}
              />
              <LabelInput
                name="angle-right"
                placeholder="Wong Fu Productions"
                onChange={(e) => this.setState({ director: e.target.value })}
                label="Director"
                value={this.state.director}
              />
              <LabelInput
                name="angle-right"
                placeholder="2008"
                onChange={(e) => this.setState({ year: e.target.value })}
                label="Year"
                value={this.state.year}
              />
              <LabelInput
                name="angle-right"
                placeholder="Megan Fox"
                onChange={(e) => this.setState({ star: e.target.value })}
                label="Star"
                value={this.state.star}
              />
              <LabelInput
                name="angle-right"
                placeholder="Horror"
                onChange={(e) => this.setState({ genre: e.target.value })}
                label="Genre"
                value={this.state.genre}
              />
              <div onClick={this.handleAddMovieClick} className="button">
                ADD
              </div>
              <div className="status error">{this.state.addMovieError}</div>
              <div className="status error">{this.props.addMovieMessageError}</div>
              <div className="status success">{this.props.addMovieMessageSuccess}</div>
            </div>
          </div>
          <div className="three-columns-container">
            <h1 className="title">Add Star</h1>
            <div id="add-star-form">
              <LabelInput
                name="angle-right"
                placeholder="Megan Fox"
                onChange={(e) => this.setState({ starFullName: e.target.value })}
                label="Full Name"
                value={this.state.starFullName}
              />
              <LabelInput
                name="angle-right"
                placeholder="1995"
                onChange={(e) => this.setState({ starBirthYear: e.target.value })}
                label="Birth Year"
                value={this.state.starBirthYear}
              />
              <div onClick={this.handleAddStarClick} className="button">
                ADD
              </div>
              <div className="status error">{this.state.addStarError}</div>
              <div className="status error">{this.props.addStarMessageError}</div>
              <div className="status success">{this.props.addStarMessageSuccess}</div>
            </div>
            <h1 className="title">Metadata</h1>
            <ul id="metadata-container">
              <li className="table">
                <h3>employees</h3>
                <p className="column-item">email VARCHAR(50) PRIMARY KEY</p>
                <p className="column-item">password VARCHAR(20) NOT NULL</p>
                <p className="column-item">fullname VARCHAR(100)</p>
              </li>
              <li className="table">
                <h3>genres</h3>
                <p className="column-item">id INTEGER PRIMARY KEY</p>
                <p className="column-item">name VARCHAR(32)</p>
              </li>
              <li className="table">
                <h3>genres_in_movies</h3>
                <p className="column-item">genreId INTEGER FOREIGN KEY</p>
                <p className="column-item">movieId VARCHAR(32) FOREIGN KEY</p>
              </li>
              <li className="table">
                <h3>stars</h3>
                <p className="column-item">id VARCHAR(10) PRIMARY KEY</p>
                <p className="column-item">name VARCHAR(100)</p>
                <p className="column-item">birthYear INTEGER</p>
              </li>
              <li className="table">
                <h3>stars_in_movies</h3>
                <p className="column-item">starId VARCHAR(10) FOREIGN KEY</p>
                <p className="column-item">movieId VARCHAR(10) FOREIGN KEY</p>
              </li>
              <li className="table">
                <h3>ratings</h3>
                <p className="column-item">movieId VARCHAR(10) FOREIGN KEY</p>
                <p className="column-item">rating FLOAT</p>
                <p className="column-item">numVotes INTEGER</p>
              </li>
              <li className="table">
                <h3>movies</h3>
                <p className="column-item">id VARCHAR(10) PRIMARY KEY</p>
                <p className="column-item">title VARCHAR(100)</p>
                <p className="column-item">year INTEGER</p>
                <p className="column-item">director VARCHAR(100)</p>
              </li>
              <li className="table">
                <h3>sales</h3>
                <p className="column-item">id INTEGER PRIMARY KEY</p>
                <p className="column-item">customerId INTEGER FOREIGN KEY</p>
                <p className="column-item">movieId VARCHAR(10) FOREIGN KEY</p>
                <p className="column-item">saleDate DATE</p>
              </li>
              <li className="table">
                <h3>customers</h3>
                <p className="column-item">id INTEGER PRIMARY KEY</p>
                <p className="column-item">firstName VARHCAR(50)</p>
                <p className="column-item">lastName VARCHAR(50)</p>
                <p className="column-item">ccId VARCHAR(20) FOREIGN KEY</p>
                <p className="column-item">address VARCHAR(200)</p>
                <p className="column-item">email VARCHAR(50)</p>
                <p className="column-item">password VARCHAR(20)</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('this is the state');
  console.log(state);

  const reducer = state.containers.employeeDashboardReducer;

  return {
    addStarMessageError: reducer.addStarMessageError,
    addStarMessageSuccess: reducer.addStarMessageSuccess,
    addMovieMessageError: reducer.addMovieMessageError,
    addMovieMessageSuccess: reducer.addMovieMessageSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch', dispatch);
  return {
    actions: bindActionCreators({ addStar, addMovie, clearDashboardReducer }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboardPage);
