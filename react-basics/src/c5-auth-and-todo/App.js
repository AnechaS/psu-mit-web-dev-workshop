import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import setupAxios from './utils/setupAxios';
import store, { persistor } from './store';

import Routes from './Routes';

setupAxios(axios, store);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}
