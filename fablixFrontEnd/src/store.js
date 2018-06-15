import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createGlobalReducer from './global-reducer';
import globalSagas from './global-sagas';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
};
const reducer = createGlobalReducer();
const persistedReducer = persistReducer(persistConfig, reducer);

const middlewares = [
  // Middleware for intercepting and dispatching navigation actions
  routerMiddleware(history),
  sagaMiddleware,
];
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(persistedReducer, undefined, composeEnhancers(applyMiddleware(...middlewares)));

const persistor = persistStore(store);

sagaMiddleware.run(globalSagas);

export default {
  store,
  persistor,
};
