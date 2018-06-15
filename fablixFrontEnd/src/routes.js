import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './store';

import LikePredicate from './components/LikePredicate';

import NavigationBar from './containers/NavigationBar';
import LoginPage from './containers/LoginPage';
import ShoppingCart from './containers/ShoppingCart';
import MovieListPage from './containers/MovieListPage';
import SearchPage from './containers/SearchPage';
import BrowsePage from './containers/BrowsePage';
import SingleMoviePage from './containers/SingleMoviePage';
import SingleStarPage from './containers/SingleStarPage';
import Checkout from './containers/Checkout';
import Confirmation from './containers/Confirmation';
import HomePage from './containers/HomePage';
import EmployeeLoginPage from './containers/EmployeeLoginPage';
import EmployeeDashboardPage from './containers/EmployeeDashboardPage';

const routes = (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <Route exact path="/Project1" component={LoginPage} />
        <Route exact path="/EmployeeLogin" component={EmployeeLoginPage} />
        <Route exact path="/EmployeeDashboard" component={EmployeeDashboardPage} />
        <Route exact path="/reports/LikePredicate" component={LikePredicate} />
        <div>
          <NavigationBar />
          <Route exact path="/Home" component={HomePage} />
          <Route exact path="/Cart" component={ShoppingCart} />
          <Route exact path="/Checkout" component={Checkout} />
          <Route exact path="/Confirmation" component={Confirmation} />
          {/* NOTE: put other app routes here */}
          <Route exact path="/MovieList" component={MovieListPage} />
          <Route exact path="/Search" component={SearchPage} />
          <Route exact path="/Browse" component={BrowsePage} />
          <Route exact path="/SingleMovie" component={SingleMoviePage} />
          <Route exact path="/SingleStar" component={SingleStarPage} />
        </div>
      </Switch>
    </div>
  </ConnectedRouter>
);
export default routes;
