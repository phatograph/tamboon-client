import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';
import { Router, Route, Link } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store'

import App from './components/Main';

import style from './css/style.css';

let routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(routes, document.querySelector('#main'));
