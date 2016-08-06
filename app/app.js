import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';
import { Router, Route, Link } from 'react-router';
let createBrowserHistory = require('history/lib/createBrowserHistory');

import style from './../css/style.css';

let App = React.createClass({
  render() {
    return (
      <h1>Hello</h1>
    );
  }
});

let routes = (
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
