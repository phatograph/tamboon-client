import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';
import { Router, Route, Link } from 'react-router';
let createBrowserHistory = require('history/lib/createBrowserHistory');

import CharitiesList from './components/CharitiesList';

import style from './../css/style.css';

const host = 'http://localhost:4001';
Omise.setPublicKey(process.env.OMISE_PKEY);

const App = React.createClass({
  getInitialState() {
    return {
      charities: []
    };
  },
  componentDidMount() {
    fetch(`${host}/charities`)
      .then((res) => { return res.json(); })
      .then((body) => { this.setState({ charities: body }); })
      .catch((e) => { document.querySelector('#cc_error').innerHTML = e; })
  },
  resetFlash() {
    document.querySelector('#flash_success').innerHTML = '';
    document.querySelector('#cc_error').innerHTML = '';
  },
  onSubmit(e) {
    e.preventDefault();
    this.resetFlash();
    this.refs.commit.disabled = true;

    const card = {
      "name": this.refs.holder_name.value,
      "number": this.refs.number.value,
      "expiration_month": this.refs.expiration_month.value,
      "expiration_year": this.refs.expiration_year.value,
      "security_code": this.refs.security_code.value
    };

    Omise.createToken("card", card, (statusCode, response) => {
      if (response.object == "error") {
        document.querySelector('#cc_error').innerHTML = response.message;
        this.refs.commit.disabled = false;
      } else {
        let contentBody = {
          'omise_token': response.id,
          amount: this.refs.amount.value,
          charity: document.querySelector(':checked').value
        };

        let option = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contentBody)
        };

        fetch(`${host}/donate`, option)
          .then((res) => { return res.json(); })
          .then((json) => {
            this.refs.commit.disabled = false;

            if (json.error) {
              document.querySelector('#cc_error').innerHTML = json.error;
            }
            else {
              document.querySelector('#flash_success').innerHTML = json.message;
            }
          })
          .catch((e) => { document.querySelector('#cc_error').innerHTML = e; })
      };
    });
  },
  render() {
    return (
      <div className={style.container}>
        <form onSubmit={this.onSubmit}>
          <h2 className={style.label}>Pick a charity:</h2>
          <CharitiesList charities={this.state.charities} />
          <div>
            <label className={style.labelList} htmlFor="amount">Amount</label>
            <input type="number" ref="amount" id="amount" defaultValue="500" step="any" /> THB
          </div>
          <div>
            <label className={style.labelList}>Number</label>
            <input type="text" id="" placeholder="XXXX XXXX XXXX XXXX" ref="number" defaultValue="4111111111111111" />
          </div>
          <div>
            <label className={style.labelList}>Name (as on card)</label>
            <input type="text" id="" placeholder="J DOE" ref="holder_name" defaultValue="pwang" />
          </div>
          <div>
            <label className={style.labelList}>Expires</label>
            <input type="text" id="" size="4" placeholder="XX" ref="expiration_month" defaultValue="10" />
            &nbsp;/&nbsp;
            <input type="text" id="" size="4" placeholder="XX" ref="expiration_year" defaultValue="18" />
          </div>
          <div>
            <label className={style.labelList}>Security Code</label>
            <input type="text" id="" size="8" placeholder="XXX" ref="security_code" defaultValue="111" />
          </div>
          <div>
            <input className={style.submit} type="submit" ref="commit" defaultValue="Donate" />
            <div id="cc_error" className={style.flashError}></div>
            <div id="flash_success" className={style.flashSuccess}></div>
          </div>
        </form>
      </div>
    );
  }
});

let routes = (
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
