import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import storeItem from './store';
import routes from './routes';

import './styles/main.css';

ReactDOM.render(
  <Provider store={storeItem.store}>
    <PersistGate loading={null} persistor={storeItem.persistor}>
      {routes}
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
