import { fork, all } from 'redux-saga/effects';

import appSagas from './containers/App/sagas';
import userSagas from './containers/LoginPage/sagas';
import moviesSaga from './containers/MovieListPage/sagas';
import singleMovieSaga from './containers/SingleMoviePage/sagas';
import singleStarSaga from './containers/SingleStarPage/sagas';
import shoppingCartSaga from './containers/ShoppingCart/sagas';
import employeeSaga from './containers/EmployeeLoginPage/sagas';
import employeeDashboardSaga from './containers/EmployeeDashboardPage/sagas';

const sagas = [
  appSagas,
  userSagas,
  // NOTE: put other app sagas here
  moviesSaga,
  singleMovieSaga,
  singleStarSaga,
  shoppingCartSaga,
  employeeSaga,
  employeeDashboardSaga,
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;
