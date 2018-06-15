import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import { getAPIData } from './actions';
import { selectApiData } from './selectors';

import LoginPage from '../LoginPage';
import MovieListPage from '../MovieListPage';
import SearchPage from '../SearchPage';
import BrwosePage from '../BrowsePage';
import './styles.css';

const getMyIp = (apiData) => apiData && apiData.origin && apiData.origin.split(', ')[1];

class App extends Component {
  componentWillMount() {
    this.props.actions.getAPIData();
  }

  render() {
    return (
      <HashRouter>
        <Route path="/" component={LoginPage} />
        <Route path="/MovieList" component={MovieListPage} />
        <Route path="/Search" component={SearchPage} />
        <Route path="/Browse" component={BrowsePage} />
      </HashRouter>
    );
  }
}

App.defaultProps = {
  apiData: {},
};

App.propTypes = {
  actions: PropTypes.object.isRequired,
  apiData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  apiData: selectApiData(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getAPIData }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
