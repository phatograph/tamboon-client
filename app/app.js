import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';
import { Router, Route, Link } from 'react-router';
let createBrowserHistory = require('history/lib/createBrowserHistory');

import style from './../css/style.css';

const host = 'http://localhost:4001';
Omise.setPublicKey(process.env.OMISE_PKEY);

let App = React.createClass({
  getInitialState() {
    return {
      charities: []
    };
  },
  componentDidMount() {
    fetch(`${host}/charities`)
      .then((res) => { return res.json(); })
      .then((body) => { this.setState({ charities: body }); });
  },
  onSubmit(e) {
    e.preventDefault();
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
            document.querySelector('#flash_success').innerHTML = json.message;
          });
      };
    });
  },
  render() {
    return (
      <div>
        <div id="flash_success"></div>
        <form onSubmit={this.onSubmit}>
          <p>Pick a charity:</p>
          <ul>
            {this.state.charities.map((charity, i) => {
              return (
                <li key={i}>
                  <input type="radio" name="charity" ref="charity" value={charity.id} id={`c${charity.id}`} />
                  <label htmlFor={`c${charity.id}`}>{charity.name}</label>
                </li>
              );
            })}
            <li>
              <input type="radio" name="charity" ref="charity" value="-1" id="c-1" defaultChecked />
              <label htmlFor="c-1">Random</label>
            </li>
          </ul>

          <div>
            <label htmlFor="amount">Amount</label><br />
            <input type="number" ref="amount" id="amount" defaultValue="500" step="any" /> THB
          </div>
          <div>
            Number<br />
            <input type="text" id="" placeholder="XXXX XXXX XXXX XXXX" ref="number" defaultValue="4111111111111111" />
          </div>
          <div>
            Name (as on card)<br />
            <input type="text" id="" placeholder="J DOE" ref="holder_name" defaultValue="pwang" />
          </div>
          <div>
            Expires<br />
            <input type="text" id="" size="4" placeholder="XX" ref="expiration_month" defaultValue="10" />
            /
            <input type="text" id="" size="4" placeholder="XX" ref="expiration_year" defaultValue="18" />
          </div>
          <div>
            Security Code<br />
            <input type="text" id="" size="8" placeholder="XXX" ref="security_code" defaultValue="111" />
          </div>
          <div>
            <input type="submit" ref="commit" defaultValue="Donate" />
            <span className="cc_error"></span>
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
