/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App.js';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store.js';

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
